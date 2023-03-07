import { Request } from "express";
import { topic as TopicModel, writing as WritingModel } from "../../models/index";
import { v4 as uuidv4 } from "uuid";


const writingOperation = async (req:Request) => {
	const { writing_id, topic, content} = req.body;
	if (writing_id) {
		WritingModel.updateOne(
			{ writing_id },
			{ 
				submit_time: new Date(Date.now()),
				writing_content: content
			}
		);
		const writingDoc = WritingModel.findOne({writing_id});

		return writingDoc;
	}

	const topicDoc = new TopicModel({
		topic_id: uuidv4(),
		topic_content: topic,
	});
	const writingDoc = new WritingModel({
		uid: req.body.uid,
		writing_id: uuidv4(),
		create_time: "1970-01-01", // this date will be changed later with other tickets
		isSubmitted: true, 
		submit_time: new Date(Date.now()),
		task_topic: topic,
		writing_content: content,
	});

	await topicDoc.save();
	await writingDoc.save();

	return writingDoc;
};


export { writingOperation };