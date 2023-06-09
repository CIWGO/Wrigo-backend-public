import { cancelSubscriptionAtPeriodEnd } from "../controllers/payment/index";
import { Router } from "express";
import { evaluateWriting } from "../controllers/index";
import { WritingStatistics, writingSubmissions } from "../controllers/index";
import { subscriptionGard, tokenGuard } from "../middlewares/index";
import { createPayment } from "../controllers/payment/index";
import { topicCategoryCounters } from "../controllers/index";
import { premWritingSample } from "../controllers/index";
import { grammarFix } from "../controllers/index";

const apiRouter = Router();

// evaluate writing (core function)
apiRouter.post("/evaluate", tokenGuard, subscriptionGard, evaluateWriting);
apiRouter.post("/writingStatistics", tokenGuard, WritingStatistics);
apiRouter.post("/topicCategoryCounters", tokenGuard, topicCategoryCounters);
// apiRouter.post("/checkout", tokenGuard, createPayment, createCustomer, completeCheckout);
apiRouter.post("/checkout", tokenGuard, createPayment);
// apiRouter.post("/checkoutSuccess", createCustomer, completeCheckout);
apiRouter.post("/writingSubmissions", tokenGuard, writingSubmissions);

// writing sample endpoint for VIP user;
apiRouter.post("/premSample", tokenGuard, subscriptionGard, premWritingSample);
//grammar fix for VIP user
apiRouter.post("/grammarFix", tokenGuard, subscriptionGard, grammarFix);


// payment
apiRouter.post("/cancelSubscriptionAtPeriodEnd", cancelSubscriptionAtPeriodEnd);

export { apiRouter };
