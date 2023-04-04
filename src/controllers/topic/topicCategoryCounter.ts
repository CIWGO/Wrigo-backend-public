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
    const categoryCounts = await TopicModel.aggregate([
      { $match: { topic_content: { $in: allTopics } } },
      {
        $lookup: {
          from: "allTopics",
          localField: "topic_content",
          foreignField: "task_topic",
          as: "topic",
        },
      },
      { $unwind: "$topic" },
      { $group: { _id: "$topic_category", count: { $sum: 1 } } },
      { $project: { category: "$_id", count: 1, _id: 0 } },
    ]).exec();

    console.log(allTopics);
    console.log(categoryCounts);

    const categoryCountsArray = categories.map((category) => {
      const count =
        categoryCounts.find((count) => count.category === category)?.count || 0;
      return { category, count };
    });

    console.log(categoryCountsArray);

    return res.status(200).json({ categoryCounts: categoryCountsArray });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Fail to response" });
  }
};

export { topicCategoryCounters };
