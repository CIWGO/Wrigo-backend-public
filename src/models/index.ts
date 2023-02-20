// Index for models
// summarise export within models module

import topic from "./writing/topic";
import feedback from "./writing/feedback";
import writing from "./writing/writing";
import operationLog from "./log/operationLog";
import paymentHistory from "./payment/paymentHistory";
import userPayment from "./payment/userPayment";
import userAccount from "./user/userAccount";
import userLoginHistory from "./user/userLoginHistory";
import userOTP from "./user/userOTP";
import userProfile from "./user/userProfile";
import userJWT from "./user/userJWT";

export {
	topic,
	feedback,
	writing,
	operationLog,
	paymentHistory,
	userPayment,
	userAccount,
	userLoginHistory,
	userOTP,
	userProfile,
	userJWT,
};

/* when you want to import into other folder/modules,
    eg. import topic from "../models/topic"
        import userAccount from "../models/userAccount"
*/
