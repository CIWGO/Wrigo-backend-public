import { cancelSubscription } from "../controllers/payment/index";
import { Router } from "express";
import { evaluateWriting } from "../controllers/index";
import { WritingStatistics, writingSubmissions, handleStripeWebhook } from "../controllers/index";
import { tokenGuard } from "../middlewares/index";
import { createPayment } from "../controllers/payment/index";

const apiRouter = Router();

// evaluate writing (core function)
apiRouter.post("/evaluate", evaluateWriting);
apiRouter.post("/writingStatistics", tokenGuard, WritingStatistics);
// apiRouter.post("/checkout", tokenGuard, createPayment, createCustomer, completeCheckout);
apiRouter.post("/checkout", tokenGuard, createPayment);
// apiRouter.post("/checkoutSuccess", createCustomer, completeCheckout);
apiRouter.post("/writingSubmissions", tokenGuard, writingSubmissions);

// payment
apiRouter.post("/cancelSubscription", cancelSubscription);
apiRouter.post("/stripe-webhook", handleStripeWebhook);

export { apiRouter };
