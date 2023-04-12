import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

/**
 * @param {User} payload (User type is defined in userSession)
 * @return {string} token
 */
const generateToken = (payload) =>
	jwt.sign(payload, secret, { expiresIn: "24h" });

/**
 * @param {string} token
 * @return {User} payload (User type is defined in userSession)
 */
const validateToken = (token) => jwt.verify(token, secret);

export { generateToken, validateToken };
