import { Response, Request } from "express";
import sendEmail from "../utils/emailNotification";
import user from "../models/users";

const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

/* generateOtp is a function that generates an hash OPT and
 returns the hashOPT as a string， anyone who calls this function
 needs to save OTP into the database
*/
export async function generateOtp(email) {
  const OTP = otpGenerator.generate(6, {
    digits: true,
    alphabets: true,
    upperCase: false,
    specialChars: false,
  });
  console.log(OTP);
  const text = `Your OTP is $OPT`;
  sendEmail("ciwgo-dev@hotmail.com", email, "Email verification", text);
  const salt = await bcrypt.genSalt(10);
  const hashOTP = await bcrypt.hash(OTP, salt);
  return hashOTP.toString();
}

const verifyOtp = async (req: Request, res: Response) => {
  const OptHolder = await user.find({
    username: req.body.username,
  });
  if (!OptHolder) return res.status(400).send("Cannot find the user");
  const rightOtpFind = OptHolder[OptHolder.length - 1];
  const validUser = await bcrypt.compare(req.body.OTP, rightOtpFind.OTP);
  if (validUser) {
    return res.status(200).send("User verify successful.");
  } else {
    return res.status(400).send("Your OTP was wrong.");
  }
};

export { verifyOtp };
