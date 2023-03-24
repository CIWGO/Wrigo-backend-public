import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// require the following data:
// invoice.paid=true  OR  invoice.paid=false
// subscription.status=active invoice.status=paid
// OR
// subscription.status=incomplete invoice.status=open
const monitorMonthlyPay = async (req, res) => {
  const event = req.body;
  const succeededInvoice = event.data.object;
  const succeededSubscriptionId = succeededInvoice.subscription;
  const failedInvoice = event.data.object;
  const failedSubscriptionId = failedInvoice.subscription;
  try {
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

    // res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

export { monitorMonthlyPay };
