// Index for controllers

import {
	changePassword,
	resetPassword,
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
} from "./user/index";

import { generatePromptForEvaluation, evaluateWriting } from "./writing/index";

export {
	changePassword,
	resetPassword,
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
	generatePromptForEvaluation,
	evaluateWriting,
};
