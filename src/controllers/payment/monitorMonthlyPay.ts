import { Stripe } from "stripe";
import { MongoClient } from "mongodb";

const endpointSecret = "whsec_...";

const stripe = new Stripe(endpointSecret, {
  apiVersion: "2022-11-15",
});

interface Invoice {
  subscription: string;
  status: string;
  id: string;
}

// require the following data:
// invoice.paid=true  OR  invoice.paid=false
// subscription.status=active invoice.status=paid
// OR
// subscription.status=incomplete invoice.status=open
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
            invoice = await stripe.invoices.retrieve(succeededInvoice.id);
            // SEND INVOICE TO DATABASE
            // need to replace MongoDB details
            const URI = "mongodb://localhost:27017";
            const client = new MongoClient(URI);
            await client.connect();
            const database = client.db("invoices");
            const collection = database.collection("invoices");
            // Insert the invoice into the database
            await collection.insertOne(invoice);
            // Close the MongoDB connection
            await client.close();
            // SEND EMAIL RECEIPT TO CUSTOMER
            // const customer = await stripe.customers.retrieve(
            //   invoice.customer.toString()
            // );
            // await stripe.invoices.sendInvoice(invoice.id, {
            //   customer: customer.id,
            // });
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
