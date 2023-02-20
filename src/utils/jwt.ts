import jwt from "jsonwebtoken";

/**
 * Replace the content of this template to the actual comments
 * Returns x raised to the n-th power.
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 * if no return, you don't have to add this @return value in comments
 * @source url
 */

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
