import { Router } from "express";
import { evaluateWriting } from "../controllers/index";
import { WritingStatistics, writingSubmissions } from "../controllers/index";
import { tokenGuard } from "../middlewares/index";

const apiRouter = Router();

// evaluate writing (core function)
apiRouter.post("/evaluate", evaluateWriting);
apiRouter.post("/writingStatistics", tokenGuard, WritingStatistics);
apiRouter.post("/writingSubmissions", tokenGuard, writingSubmissions);

export { apiRouter };
