import { Request, Response } from "express";
import { validateToken } from "../utils/jwt";

interface AuthRequest extends Request {
  user?: any;
}

// call this middleware for functions that need to be protected by user login token
const tokenGuard = (req: AuthRequest, res: Response, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.status(401).json({ error: "missing the authorization header" });
  }

  // valid authorization format: Bearer {token}
  const tokenArray = authorization.split(" ");
  if (tokenArray.length != 2 || tokenArray[0] != "Bearer") {
    return res
      .status(401)
      .json({ error: "invalid authorization header format" });
  }

  try {
    const payload = validateToken(tokenArray[1]);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { tokenGuard };
