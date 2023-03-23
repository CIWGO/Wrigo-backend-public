import { Request, Response } from "express";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// this middleware is to check if payment went through
const monitorMonthlyPay = async (req: Request, res: Response) => {
  interface MyWebhookEvent extends Stripe.Event {
    data: {
      object: {
        subscription: string;
        amount_paid: number;
        paid_at: number;
      };
    };
  }

  const stripeEvent = req.body as MyWebhookEvent;

  try {
    const subscriptionId = stripeEvent.data.object.subscription;
    const amount = stripeEvent.data.object.amount_paid;
    const payTime = stripeEvent.data.object.paid_at;
    // switch statement to handle different types of events
    switch (stripeEvent.type) {
      case "invoice.payment_succeeded":
        console.log(
          `Payment of ${amount} received for subscription ${subscriptionId} at ${payTime}`
        );
        // TODO: Send email notification to user about successful payment
        // break ends current case
        break;
      case "invoice.payment_failed":
        console.log(
          `Payment of ${amount} for subscription ${subscriptionId} failed at ${payTime}`
        );
        // TODO: Send email notification to user about payment failure
        // break ends current case
        break;
      // default is executed in when no case matches the value of the expression
      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

// reference
// https://stripe.com/docs/payments/payment-intents/verifying-status

export { monitorMonthlyPay };
