import { Stripe } from "stripe";
import { MongoClient } from "mongodb";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const MONGODB_URI = "mongodb://localhost:27017/mydatabase";
const DB_NAME = "mydatabase";
const recipientEmail = "example@example.com";
const senderEmail = "example@example.com";
const customerName = "John Doe";


const endpointSecret = "whsec_...";

const stripe = new Stripe(endpointSecret, {
  apiVersion: "2022-11-15",
});

interface Invoice {
  subscription: string;
  status: string;
  id: string;
  customer: string;
  amount_paid: number;
  currency: string;
  created: number;
}

const monitorMonthlyPay = async (req, res) => {
  let event = req.body;
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      // Failed to get Stripe signature
      console.log("⚠️  Webhook signature verification failed.", err.message);
      return res.sendStatus(400);
    }
    const succeededInvoice = event.data.object as Invoice;
    const succeededSubscriptionId = succeededInvoice.subscription;
    const failedInvoice = event.data.object as Invoice;
    const failedSubscriptionId = failedInvoice.subscription;
    const succeededSubscription = await stripe.subscriptions.retrieve(
      succeededSubscriptionId
    );
    const failedSubscription = await stripe.subscriptions.retrieve(
      failedSubscriptionId
    );
    try {
      // get invoice
      let invoice;
      switch (event.type) {
        // Handle successful payment and active subscription
        case "invoice.payment_succeeded":
          if (
            succeededSubscription.status === "active" &&
            succeededInvoice.status === "paid"
          ) {
            // 1.get uid, customer id and subscription id
            const uid = req.uid; // Assuming uid is available in the request
            const customerId = succeededInvoice.customer;
            const subscriptionId = succeededSubscription.id;
            //  2. use uid to find/create payment history
            const getPaymentHistoryCollection = async () => {
              const client = await MongoClient.connect(MONGODB_URI, {});
              const db = client.db(DB_NAME);
              return db.collection("payment_history");
            };
            // 3. paymentInvoice: create payment invoice with incoming stripe data
            const createPaymentInvoice = async (
              customer,
              subscription,
              invoice
            ) => {
              const paymentHistoryCollection =
                await getPaymentHistoryCollection();
              const uid = customer.metadata.userId;
              const customer_id = customer.id;
              const subscription_id = subscription.id;
              const amount_paid = invoice.amount_paid;
              const invoice_id = invoice.id;

              const paymentHistory = {
                uid,
                customer_id,
                subscription_id,
                amount_paid,
                invoice_id,
                created_at: new Date(),
              };

              await paymentHistoryCollection.insertOne(paymentHistory);

              return paymentHistory;
            };
            // 4. paymentHistory: update/create payment history, add invoice into array
            if (
              succeededSubscription.status === "active" &&
              succeededInvoice.status === "paid"
            ) {
              const uid = req.uid;
              const customerId = succeededSubscription.customer.toString();
              const subscriptionId = succeededSubscription.id.toString();
              const invoiceId = succeededInvoice.id.toString();
              const invoiceAmount = succeededInvoice.amount_paid;
              const invoiceCurrency = succeededInvoice.currency;
              const invoiceDate = new Date(succeededInvoice.created * 1000);

              const paymentHistoryCollection =
                await getPaymentHistoryCollection();
              const paymentHistory = await paymentHistoryCollection.findOne({
                uid,
              });

              if (paymentHistory) {
                const updatedPaymentHistory = {
                  ...paymentHistory,
                  invoices: [
                    ...paymentHistory.invoices,
                    {
                      invoiceId,
                      amount: invoiceAmount,
                      currency: invoiceCurrency,
                      date: invoiceDate,
                    },
                  ],
                };
                await paymentHistoryCollection.updateOne(
                  { uid },
                  { $set: updatedPaymentHistory }
                );
              } else {
                const newPaymentHistory = {
                  uid,
                  customerId,
                  subscriptionId,
                  invoices: [
                    {
                      invoiceId,
                      amount: invoiceAmount,
                      currency: invoiceCurrency,
                      date: invoiceDate,
                    },
                  ],
                };
                await paymentHistoryCollection.insertOne(newPaymentHistory);
              }

              // 5. userAccount: set user isSubscribe to TRUE
              const updateUserIsSubscribe = async (uid) => {
                const client = await MongoClient.connect(MONGODB_URI, {
                  // useNewUrlParser: true,
                  // useUnifiedTopology: true,
                });
                const db = client.db(DB_NAME);
                const usersCollection = db.collection("users");

                try {
                  const result = await usersCollection.updateOne(
                    { uid },
                    { $set: { isSubscribe: true } }
                  );

                  console.log(`Updated ${result.modifiedCount} document.`);
                } catch (error) {
                  console.log(error);
                } finally {
                  client.close();
                }
              };
              // 6. send successful email

              

              // Assuming you have a template in SendGrid for the successful payment email
              const SUCCESSFUL_PAYMENT_TEMPLATE_ID = "<YOUR_TEMPLATE_ID>";

              const sendSuccessfulPaymentEmail = async (customerEmail) => {
                const message = {
                  to: recipientEmail,
                  from: senderEmail,
                  templateId: "your-template-id",
                  dynamicTemplateData: {
                    customerName: customerName,
                    invoiceAmount: "$" + (invoiceAmount / 100).toFixed(2),
                  },
                };
                

                try {
                  await sgMail.send(message);
                  console.log("Successful payment email sent");
                } catch (error) {
                  console.error(error);
                }
              };

              // Call this function when a successful payment is made
              if (
                succeededSubscription.status === "active" &&
                succeededInvoice.status === "paid"
              ) {
                // Assuming you have the customer email available in the subscription metadata
                const customerEmail =
                  succeededSubscription.metadata.customer_email;
                await sendSuccessfulPaymentEmail(customerEmail);
              }
            }
          }
          break;
        // Handle failed payment and incomplete subscription
        case "invoice.payment_failed":
          if (
            failedSubscription.status === "incomplete" &&
            failedInvoice.status === "open"
          ) {
            invoice = await stripe.invoices.retrieve(failedInvoice.id);
          }
          // TODO: send email reminder
          // TODO: Delete customer ID,subscribe ID, invoice paid field, update User.isSubscirbed to false
          break;
        case "customer.subscription.updated":
          break;
        default:
          // Unexpected event type
          break;
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error");
    }
  }
};

// references
// https://stripe.com/docs/webhooks
// https://stripe.com/docs/webhooks/quickstart

export { monitorMonthlyPay };
