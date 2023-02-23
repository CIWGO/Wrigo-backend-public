import { operationLog as operationLogModel } from "../../models/index";

/**
 * receive a log type, find all the operation logs and return them.
 * @param {string} log_type what type of operation log this is, including:
 * (1) userCreation
 * (2) authentication
 * (3) userAction
 * (4) payment
 * (5) ApiCall
 * @return {Promise<Array>} all the operation log documents of the log type as an array
 * Note: the type of this return is Promise, so it should be handled using "then" and "catch" when being used
 */
const findOperationLogByType = async (log_type: string) => {
	return await operationLogModel.find({ log_type }).exec();
};

/**
 * receive uid, find all the operation logs and return them.
 * @param {string} uid user id
 * @return {Promise<Array>} all the operation log documents of this uid as an array
 * Note: the type of this return is Promise, so it should be handled using "then" and "catch" when being used
 */
const findOperationLogByUid = async (uid: string) => {
	return await operationLogModel.find({ uid }).exec();
};

export { findOperationLogByType, findOperationLogByUid };