import { operationLog as operationLogModel } from "../../models/index";
import { v4 as uuidv4 } from "uuid";

/**
 * create an operation log and store it into DB
 * @param {boolean} login_status whether the user has logged in
 * @param {string} log_type what type of operation log this is, including:
 * (1) userCreation
 * (2) authentication
 * (3) userAction
 * (4) payment
 * (5) ApiCall
 * @return void, this function only stores the operation log created into DB
 */
const createOperationLog = async (login_status: boolean, log_type: string, log_content: string, uid?: string) => {
	// create a new operation log
	const operationLog = new operationLogModel({
		log_id: uuidv4(),
		uid: uid,
		login_status: login_status,
		log_time: new Date(Date.now()),
		log_type: log_type,
		log_content: log_content
	});
	// save the operation log into DB
	await operationLog.save();
};

export { createOperationLog };