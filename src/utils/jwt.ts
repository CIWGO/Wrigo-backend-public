import jwt from "jsonwebtoken";

const { JWT_KEY } = process.env;

const generateToken = (payload) =>
	jwt.sign(payload, JWT_KEY, { expiresIn: "1h" });

const validateToken = (token) => jwt.verify(token, JWT_KEY);

export { generateToken, validateToken };
