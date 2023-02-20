import { Router } from "express";
import { evaluateWriting } from "../controllers/writing/writingService";

const apiRouter = Router();

// evaluate writing (core function)
apiRouter.post("/evaluate", evaluateWriting);

export { apiRouter };
