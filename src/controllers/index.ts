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
	changeEmail
} from "./user/index";

import { evaluateWriting, viewHistory, WritingStatistics } from "./writing/index";

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
	changeEmail,
	evaluateWriting,
	createOperationLog,
	findOperationLogByType,
	findOperationLogByUid,
	viewHistory,
	WritingStatistics
};
