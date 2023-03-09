// Index for models
// summarise export within models module

import topic from "./writing/topic";
import feedback from "./writing/feedback";
import writing from "./writing/writing";
import sampleWriting from "./writing/sampleWriting";
import operationLog from "./log/operationLog";
import paymentHistory from "./payment/paymentHistory";
import userPayment from "./payment/userPayment";
import userAccount from "./user/userAccount";
import userOTP from "./user/userOTP";
import userProfile from "./user/userProfile";


export {
	topic,
	feedback,
	writing,
	sampleWriting,
	operationLog,
	paymentHistory,
	userPayment,
	userAccount,
	userOTP,
	userProfile,
};

/* when you want to import into other folder/modules,
	eg. import topic from "../models/topic"
		import userAccount from "../models/userAccount"
*/
