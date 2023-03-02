// Index for controllers

import {
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
} from "./user/index";

import { evaluateWriting, viewHistory } from "./writing/index";

import { createOperationLog, findOperationLogByType, findOperationLogByUid } from "./log/index";

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
	evaluateWriting,
	createOperationLog,
	findOperationLogByType,
	findOperationLogByUid,
	viewHistory
};
