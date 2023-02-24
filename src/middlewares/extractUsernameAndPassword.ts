import { Request, Response, NextFunction } from "express";

// Define the Request interface
interface RequestWithLocals extends Request {
  locals: {
    username?: string;
    password?: string;
  };
}

const extractUsernameAndPassword = (
	req: RequestWithLocals,
	res: Response,
	next: NextFunction
) => {
	try {
		const { username, password } = req.body;
		req.locals = { username, password };
		next();
	} catch (err) {
		return res.status(404).json({ message: "Invalid input" });
	}
};

export { extractUsernameAndPassword };
