import { Request, Response } from "express";
import { getSubmittedWritingHistoryByMonth } from "./writingHistory";

const writingSubmissions = async (req: Request, res: Response) => {
	try {
		const {year, uid} = req.body;
		const data = {
			[`${year}-Jan`]: (await getSubmittedWritingHistoryByMonth(year, 1, uid)).length,
			[`${year}-Feb`]: (await getSubmittedWritingHistoryByMonth(year, 2, uid)).length,
			[`${year}-Mar`]: (await getSubmittedWritingHistoryByMonth(year, 3, uid)).length,
			[`${year}-Apr`]: (await getSubmittedWritingHistoryByMonth(year, 4, uid)).length,
			[`${year}-May`]: (await getSubmittedWritingHistoryByMonth(year, 5, uid)).length,
			[`${year}-Jun`]: (await getSubmittedWritingHistoryByMonth(year, 6, uid)).length,
			[`${year}-Jul`]: (await getSubmittedWritingHistoryByMonth(year, 7, uid)).length,
			[`${year}-Aug`]: (await getSubmittedWritingHistoryByMonth(year, 8, uid)).length,
			[`${year}-Sep`]: (await getSubmittedWritingHistoryByMonth(year, 9, uid)).length,
			[`${year}-Oct`]: (await getSubmittedWritingHistoryByMonth(year, 10, uid)).length,
			[`${year}-Nov`]: (await getSubmittedWritingHistoryByMonth(year, 11, uid)).length,
			[`${year}-Dec`]: (await getSubmittedWritingHistoryByMonth(year, 12, uid)).length
		};
		
		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message || "Failed to gather data from the lineChart" });
	}
};

export default writingSubmissions;

// import { Request, Response } from "express";
// import { getSubmittedWritingHistoryByDate } from "./writingHistory";

// interface SubmissionData {
// 	date: string;
// 	submissions: number;
// 	month: number;
// 	day: number;
// 	week: number
// }

// const writingSubmissions = async (req: Request, res: Response) => {
// 	try {
// 		const { uid } = req.body;

// 		const currentDate = new Date();
// 		// const formattedCurrentDate = formatDate(currentDate);

// 		const threeMonthsAgo = new Date(currentDate);
// 		threeMonthsAgo.setFullYear(currentDate.getFullYear() - 1);
// 		const formattedThreeMonthsAgo = formatDate(threeMonthsAgo);

// 		/* algorithm rules:
// 			1. create a new array
// 			2. start from one month ago, for each date
// 				(1) find writing by date
// 					(a) if not found, create
// 					{
// 						"date": ,
// 						"submissions": 0,
// 						"month": ,
// 						"day": 
// 					}
// 					(b) if found, create
// 					{
// 						"date": ,
// 						"submissions": submission number,
// 						"month": ,
// 						"day": 
// 					}
					
// 				(2) next date
// 				(3) after finish today, break, return the array to front end 
// 		*/
// 		const newArray: SubmissionData[] = [];
// 		const tomorrowDate = new Date(currentDate);
// 		tomorrowDate.setDate(currentDate.getDate() + 1);
// 		const formattedTomorrowDate = formatDate(tomorrowDate);

// 		const dateSearched = threeMonthsAgo;
// 		let formattedDateSearched = formatDate(dateSearched);

// 		dateSearched.setDate(dateSearched.getDate() + 1);
// 		formattedDateSearched = formatDate(dateSearched);

// 		while (formattedDateSearched !== formattedTomorrowDate) {
// 			const writingHistoryOfDateSearched = await getSubmittedWritingHistoryByDate(formattedDateSearched, uid);

// 			const submissionNumber = writingHistoryOfDateSearched.length;
// 			const weekNumber = calculateWeeksBetweenDates(formattedThreeMonthsAgo, formattedDateSearched);
// 			const newObject: SubmissionData = {
// 				"date": formattedDateSearched,
// 				"submissions": submissionNumber,
// 				"month": dateSearched.getMonth(),
// 				"day": dateSearched.getDay(),
// 				"week": weekNumber
// 			};
// 			newArray.push(newObject);

// 			// update to next date
// 			dateSearched.setDate(dateSearched.getDate() + 1);
// 			formattedDateSearched = formatDate(dateSearched);
// 		}
// 		res.status(200).json(newArray);
// 	} catch (err) {
// 		res.status(500).json({ error: err.message || "Failed to get submission data" });
// 	}
// };

// const formatDate = (date) => {
// 	// get date
// 	const year = date.getFullYear();
// 	const month = date.getMonth() + 1; // Months are zero-based, so we add 1
// 	const day = date.getDate(); // due to time zone reason - 1

// 	// Add leading zeros to month and day if they are single digits
// 	const formattedMonth = month < 10 ? `0${month}` : month;
// 	const formattedDay = day < 10 ? `0${day}` : day;
// 	const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
// 	return formattedDate;
// };

// const calculateWeeksBetweenDates = (startDate: string, endDate: string): number => {
// 	// 将输入字符串转换为日期对象
// 	const start: Date = new Date(startDate);
// 	const end: Date = new Date(endDate);

// 	// 计算两个日期之间的天数差
// 	const dayDifference: number = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

// 	// 获取给定日期的星期几，将星期日作为一周的第0天
// 	const startDayOfWeek: number = start.getDay();

// 	// 计算周数
// 	const weeks: number = Math.floor((dayDifference + startDayOfWeek) / 7);

// 	return weeks;
// };

// export default writingSubmissions;