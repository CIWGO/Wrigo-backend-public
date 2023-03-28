import { topicCatPrompt, topicDiffPrompt } from "./topicCatPrompt";
import { openAIRequest } from "../../utils/openAIRequest";

const topicCategory = async (topic: string) => {
    const prompt = topicCatPrompt(topic);
    const category = await openAIRequest(prompt, true, 3);

    if (category.includes(""))

    return category;
};

const topicDifficulty = async (topic: string) => {
    const prompt = topicDiffPrompt(topic);
    const difficulty = await openAIRequest(prompt, true, 3);

    return difficulty;
};

export { topicCategory, topicDifficulty };