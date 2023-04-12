import { Response, Request } from "express";
import {
  topic as TopicModel,
  writing as WritingModel,
} from "../../models/index";

const topicCategoryCounters = async (req: Request, res: Response) => {
  const { uid } = req.body;
  try {
    const allWritings = await WritingModel.find({ uid }).exec();
    const allTopics = allWritings.map((writing) => writing.task_topic);
    const categories = [
      "Opinion",
      "Discussion",
      "Problem and Solution",
      "Direct Question",
      "Advantage and Disadvantage",
    ];
    const matchedTopics = await TopicModel.find({
      topic_content: { $in: allTopics },
    });
    const categoryCounts = categories.reduce((acc, category) => {
      acc[category] = matchedTopics.filter(
        (topic) => topic.topic_category === category
      ).length;
      return acc;
    }, {});
    
    categoryCounts["Others"] = matchedTopics.filter(
      (topic) => !categories.includes(topic.topic_category)
    ).length;

    // console.log(categoryCounts);

    return res.status(200).json({ categoryCounts });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Fail to response" });
  }
};

export { topicCategoryCounters };
