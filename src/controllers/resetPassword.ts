import { Request, Response } from "express";
import User from "../models/users";
import generateOTP from "../utils/generateOTP";
import sendEmail from "../utils/emailNotification";

const resetPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    // Find user in the database
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const OTP = generateOTP();

    // Save OTP to the user document
    user.OTP = OTP;
    await user.save();

    // Send the OTP to the user's email address
    const msg = `Your OTP for resetting your password is: ${OTP}`;
    sendEmail(
        "ciwgo-dev@hotmail.com", 
        email, 
        "Password Changed", 
        msg
    );

    // Return success response
    res.send({ message: "OTP sent to your email address" });
};

export default resetPassword;
