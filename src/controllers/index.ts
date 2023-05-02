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
	changeEmail,
	viewPastPayment
} from "./user/index";

import { 
	evaluateWriting, 
	viewHistory, 
	WritingStatistics, 
	writingSubmissions, 
	writingDraft, 
	deleteWritings,
	premWritingSample,
	grammarFix
 } from "./writing/index";

import {
	createOperationLog,
	findOperationLogByType,
	findOperationLogByUid,
} from "./log/index";

import { 
	findTopic, 
	searchAllTopics, 
	searchUserTopics,
	topicCategoryCounters 
} from "./topic/index";

import {
	createPayment,
	createCustomer,
	handleStripeWebhook
} from "./payment/index";


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
	searchAllTopics,
	searchUserTopics,
	writingSubmissions,
	writingDraft,
	findTopic,
	createPayment,
	createCustomer,
	viewPastPayment,
	handleStripeWebhook,
	deleteWritings,
	topicCategoryCounters,
	premWritingSample,
	grammarFix
};
