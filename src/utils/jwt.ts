import jwt from "jsonwebtoken";

// the original token function -> keep for future use
// const { JWT_KEY } = process.env;

// const generateToken = (payload) =>
// 	jwt.sign(payload, JWT_KEY, { expiresIn: "1h" });

// const validateToken = (token) => jwt.verify(token, JWT_KEY);

const secret = process.env.JWT_SECRET;

const generateToken = (payload) =>
	jwt.sign(payload, secret, { expiresIn: "1h" });

const validateToken = (token) => jwt.verify(token, secret);

export { generateToken, validateToken };
