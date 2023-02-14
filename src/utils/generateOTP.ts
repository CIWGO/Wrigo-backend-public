import { randomBytes } from "crypto";

const generateOTP = (): string => {
	const buffer = randomBytes(3);
	return buffer.toString("hex");
};

export { generateOTP };
