// Index for user controllers

import { changePassword } from "./changePassword";
import { deleteUser } from "./userDelete";
import { login } from "./userLogin";
import { sendOTPViaEmail, verifyOTP } from "./userOtp";
import {
	showUserProfile,
	createUserProfile,
	updateUserProfile,
} from "./userProfile";
import { register } from "./userRegister";
import { tokenGuard } from "../../middlewares/userSession";
import { createUser } from "./userSignup";

export {
	changePassword,
	deleteUser,
	login,
	sendOTPViaEmail,
	verifyOTP,
	showUserProfile,
	createUserProfile,
	updateUserProfile,
	register,
	tokenGuard,
	createUser,
};
