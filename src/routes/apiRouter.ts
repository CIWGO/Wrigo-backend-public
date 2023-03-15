import { cancelSubscription } from "../controllers/payment/index";
import { Router } from "express";
import { evaluateWriting, WritingStatistics } from "../controllers/index";
import { tokenGuard } from "../middlewares/index";

const apiRouter = Router();

// evaluate writing (core function)
apiRouter.post("/evaluate", evaluateWriting);
apiRouter.post("/writingStatistics",tokenGuard, WritingStatistics);

// payment
apiRouter.post("/cancelSubscription", cancelSubscription);

export { apiRouter };
