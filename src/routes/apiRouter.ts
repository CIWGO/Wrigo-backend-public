import { cancelSubscription } from "../controllers/payment/index";
import { Router } from "express";
import { evaluateWriting } from "../controllers/index";
import { WritingStatistics, writingSubmissions,handleStripeWebhook } from "../controllers/index";
import { tokenGuard } from "../middlewares/index";
// import { createPayment, createCustomer, completeCheckout} from "../controllers/payment/index";

const apiRouter = Router();

// evaluate writing (core function)
apiRouter.post("/evaluate", evaluateWriting);
apiRouter.post("/writingStatistics", tokenGuard, WritingStatistics);
// apiRouter.post("/checkout", tokenGuard,createPayment,createCustomer, completeCheckout);
apiRouter.post("/writingSubmissions", tokenGuard, writingSubmissions);

// payment
apiRouter.post("/cancelSubscription", handleStripeWebhook);
apiRouter.post("/stripe-webhook", cancelSubscription);

export { apiRouter };
