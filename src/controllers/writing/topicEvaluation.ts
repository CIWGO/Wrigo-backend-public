import { topicCatPrompt, topicDiffPrompt } from "./topicCatPrompt";
import { openAIRequest } from "../../utils/openAIRequest";

const topicCategory = async (topic: string) => {
    const prompt = topicCatPrompt(topic);
    const categoryOutput = await openAIRequest(prompt, true, 3);
    const categoryArray = categoryOutput.split(" ");
    const index = categoryArray.indexOf("type:");
    const category = categoryArray[index + 1];


    return category;
};

const topicDifficulty = async (topic: string) => {
    const prompt = topicDiffPrompt(topic);
    const difficultyOutput = await openAIRequest(prompt, true, 3);
    const difficultyArray = difficultyOutput.split(" ");
    const index = difficultyArray.indexOf("difficulty:");
    const difficulty = difficultyArray[index + 1];

    return difficulty;
};

export { topicCategory, topicDifficulty };