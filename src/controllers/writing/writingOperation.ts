import { Request } from "express";
import { topic as TopicModel, writing as WritingModel } from "../../models/index";
import { v4 as uuidv4 } from "uuid";

const writingOperation = async (req: Request) => {
	const { writing_id, topic, content } = req.body;

	let writingDoc = await WritingModel.findOne({ writing_id });
	if (writingDoc) {
		writingDoc.submit_time = new Date(Date.now());
		writingDoc.writing_content = content;
		writingDoc.task_topic = topic; // topic should not be updated after initial creation
		await writingDoc.save();
		return writingDoc;
	} else {
		const topicDoc = new TopicModel({
			topic_id: uuidv4(),
			topic_content: topic,
		});
		writingDoc = new WritingModel({
			uid: req.body.uid,
			writing_id: writing_id,
			create_time: "1970-01-01", // this date will be changed later with other tickets
			isSubmitted: true,
			submit_time: new Date(Date.now()),
			task_topic: topic,
			writing_content: content,
		});
		await writingDoc.save();
		await topicDoc.save();
	}
	return writingDoc;
};

export { writingOperation };