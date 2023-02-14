// import { Request, Response } from "express";
// import { validateToken } from "../utils/jwt"

// const createUserSession = (user) => {
//   const payload = {
//     username: user.username,
//   };

//   const secret = process.env.JWT_SECRET;
//   const options = { expiresIn: "1h" };

//   return jwt.sign(payload, secret, options);
// };

// const validateToken = (token) => {

// }

//valid authorization format: Bearer {token}
// const tokenGuard = (req: Request, res: Response){
//   const authorization = req.header('Authorization');

//   if (!authorization) {
//     return res.status(401).json({ error: "missing the authorization header" });
//   }

//   const tokenArray = authorization.split(' ');
//   if (tokenArray.length != 2 || tokenArray[0] != 'Bearer') {
//     return res.status(401).json({ error: "invalid authorization header format" });
//   }
//   const payload = validateToken(tokkenArray[1]);

// }

// export { createUserSession };
