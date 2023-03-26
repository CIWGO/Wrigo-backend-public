import { Stripe } from "stripe";

const endpointSecret = "whsec_...";

const stripe = new Stripe(endpointSecret, {
  apiVersion: "2022-11-15",
});

interface Invoice {
  subscription: string;
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
    try {
      // get invoice
      //
      switch (event.type) {
        case "invoice.payment_succeeded":
          await stripe.subscriptions.retrieve(succeededSubscriptionId);
          // Handle successful payment and active subscription
          break;
        case "invoice.payment_failed":
          await stripe.subscriptions.retrieve(failedSubscriptionId);
          // Handle failed payment and incomplete subscription
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
