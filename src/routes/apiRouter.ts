import { Router } from "express";
import { evaluateWriting } from "../controllers/index";
import { WritingStatistics, writingSubmissions } from "../controllers/index";
import { tokenGuard } from "../middlewares/index";
// import { createPayment, createCustomer, completeCheckout} from "../controllers/payment/index";

const apiRouter = Router();

// evaluate writing (core function)
apiRouter.post("/evaluate", evaluateWriting);
apiRouter.post("/writingStatistics", tokenGuard, WritingStatistics);
// apiRouter.post("/checkout", tokenGuard,createPayment,createCustomer, completeCheckout);
apiRouter.post("/writingSubmissions", tokenGuard, writingSubmissions);

export { apiRouter };
