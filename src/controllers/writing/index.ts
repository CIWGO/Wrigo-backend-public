// Index for writing controllers

// import { generatePromptForEvaluation } from "./promptOperation";
import { evaluateWriting } from "./writingEvaluation";
//import { responseOperation } from "./responseOperation";
import { viewHistory } from "./writingHistory";

import WritingStatistics from "./writingStatistics";
import getSubmittedWritingHistoryByPeriod from "./writingSubmissions";

export {
	// generatePromptForEvaluation,
	evaluateWriting,
	viewHistory,
	WritingStatistics,
	getSubmittedWritingHistoryByPeriod
	//responseOperation
};
