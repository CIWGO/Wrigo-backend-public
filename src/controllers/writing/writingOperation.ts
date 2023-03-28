import { Request } from "express";
import { topic as TopicModel, writing as WritingModel } from "../../models/index";
import { topicCategory as Category, topicDifficulty as Difficulty } from "./topicEvaluation";
import { v4 as uuidv4 } from "uuid";

const writingOperation = async (req: Request) => {
	const { writing_id, topic, content } = req.body;

	let writingDoc = await WritingModel.findOne({ writing_id });

	if (writingDoc) {
		writingDoc.submit_time = new Date(Date.now());
		writingDoc.writing_content = content;
		// change to update
		await writingDoc.save();
		return writingDoc;
	} else {
		const isTopicExist = await TopicModel.findOne({ topic });
		if (!isTopicExist) {
			const topicCategory = await Category(topic);
			const topicDifficulty = await Difficulty(topic);
			
			const topicDoc = new TopicModel({
				topic_id: uuidv4(),
				topic_content: topic,
				topic_category: topicCategory,
				topic_difficulty: topicDifficulty,
				popularity: 1
			});
			await topicDoc.save();
		} else if (isTopicExist) {
			const topicId = isTopicExist.topic_id;
			const newPopularity = isTopicExist.popularity + 1;
			await TopicModel.findOneAndUpdate(
				{ topicId },
				{
					$set: { popularity: newPopularity },
				},
				{ new: true }
			).exec();
		}

		writingDoc = new WritingModel({
			uid: req.body.uid,
			writing_id: writing_id,
			create_time: new Date(Date.now()),
			isSubmitted: true,
			submit_time: new Date(Date.now()),
			task_topic: topic,
			writing_content: content,
		});
		await writingDoc.save();
	}
	return writingDoc;
};

export { writingOperation };