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
	getUserAccount,
	changeEmail
} from "./user/index";

import { evaluateWriting, viewHistory, WritingStatistics } from "./writing/index";

import { createOperationLog, findOperationLogByType, findOperationLogByUid } from "./log/index";

import { findTopic } from "./topic/index";

import { createPayment } from "./payment/index";

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
	getUserAccount,
	changeEmail,
	evaluateWriting,
	createOperationLog,
	findOperationLogByType,
	findOperationLogByUid,
	viewHistory,
	WritingStatistics,
	findTopic,
	createPayment
};
