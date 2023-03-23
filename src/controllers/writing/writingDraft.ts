import { Request, Response } from "express";
import { topic as TopicModel, writing as WritingModel } from "../../models/index";
import { v4 as uuidv4 } from "uuid";

const writingDraft = async (req: Request, res: Response) => {
	const { writing_id, topic, content } = req.body;
	try {
		let writingDoc = await WritingModel.findOne({ writing_id });
		if (writingDoc) {
			writingDoc.writing_content = content;
			await writingDoc.save();
		} else {
			const topicDoc = new TopicModel({
				topic_id: uuidv4(),
				topic_content: topic,
			});
			writingDoc = new WritingModel({
				uid: req.body.uid,
				writing_id: writing_id,
				create_time: new Date(Date.now()),
				isSubmitted: false,
				task_topic: topic,
				writing_content: content,
			});
			await writingDoc.save();
			await topicDoc.save();
		}
		return res.status(200).json(({ message: "Draft saved successful." }));

	} catch (error) {
		return res
			.status(500)
			.json({ error: error.message || "Failed to save draft, please retry." });
	}
};

export { writingDraft };