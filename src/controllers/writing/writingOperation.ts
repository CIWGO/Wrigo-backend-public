import { Request } from "express";
import { topic as TopicModel, writing as WritingModel } from "../../models/index";
import { topicCategory as Category, topicDifficulty as Difficulty } from "./topicEvaluation";
import { v4 as uuidv4 } from "uuid";
import { writingSample } from "./writingSample";

const writingOperation = async (req: Request) => {
	const { writing_id, topic_content, content } = req.body;

	let writingDoc = await WritingModel.findOne({ writing_id });

	if (writingDoc) {
		console.log(`oldWriting`);
		writingDoc.submit_time = new Date(Date.now());
		writingDoc.writing_content = content;

		WritingModel.findOneAndUpdate(
			{ writing_id },
			{
				$set: {
					submit_time: new Date(Date.now()),
					writing_content: content
				},
			},
			{ new: true }
		).exec();
		return writingDoc;
	} else {
		console.log(`newWriting`);
		const isTopicExist = await TopicModel.findOne({ topic_content });

		if (isTopicExist === null) {
			console.log(`newTopic`);
			const topicCategory = await Category(topic_content);
			console.log(topicCategory);
			const topicDifficulty = await Difficulty(topic_content);
			console.log(topicDifficulty);
			const topicDoc = new TopicModel({
				topic_id: uuidv4(),
				topic_content: topic_content,
				topic_category: topicCategory,
				topic_difficulty: topicDifficulty,
				popularity: 1
			});
			console.log(`newTopic: ${topicDoc}`);
			await topicDoc.save();
			await writingSample(topicDoc.topic_id, topicDoc.topic_content);
		} else if (isTopicExist) {

			const topicDoc = await TopicModel.findOne({ isTopicExist }).exec();
			const topicId = topicDoc.topic_id;
			const newPopularity = topicDoc.popularity + 1;
			await TopicModel.findOneAndUpdate(
				{ topicId },
				{
					$set: { popularity: newPopularity },
				},
				{ new: true }
			).exec();
			console.log(`oldTopic: ${topicDoc}`);
			// await writingSample(topicDoc.topic_id, topicDoc.topic_content);
		}

		writingDoc = new WritingModel({
			uid: req.body.uid,
			writing_id: writing_id,
			create_time: new Date(Date.now()),
			isSubmitted: true,
			submit_time: new Date(Date.now()),
			task_topic: topic_content,
			writing_content: content,
		});

		await writingDoc.save();
	}
	return writingDoc;
};

export { writingOperation };