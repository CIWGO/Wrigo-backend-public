import { Router } from "express";
import { evaluateWriting } from "../controllers/index";
import { WritingStatistics } from "../controllers/index";
import { tokenGuard } from "../middlewares/index";
import { createPayment, createCustomer} from "../controllers/payment/index";

const apiRouter = Router();

// evaluate writing (core function)
apiRouter.post("/evaluate", evaluateWriting);
apiRouter.post("/writingStatistics", tokenGuard, WritingStatistics);
apiRouter.post("/checkout",tokenGuard, createPayment);
apiRouter.post("/checkout", createPayment,createCustomer);

export { apiRouter };
