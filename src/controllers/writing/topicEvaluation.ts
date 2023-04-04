import { topicCatPrompt, topicDiffPrompt } from "./topicCatPrompt";
import { openAIRequest } from "../../utils/openAIRequest";

const topicCategory = async (topic: string) => {
    const prompt = topicCatPrompt(topic);
    const categoryOutput = await openAIRequest(prompt, true);
    const regexCategory = /Type:\s+([\w\s]+)/i;
    const extractedCategory = categoryOutput.match(regexCategory)[1];

    return extractedCategory;
};

const topicDifficulty = async (topic: string) => {
    const prompt = topicDiffPrompt(topic);
    const difficultyOutput = await openAIRequest(prompt, true);
    const regexDifficulty = /Difficulty:\s+([\w\s]+)/i;
    const extractedDifficulty = difficultyOutput.match(regexDifficulty)[1];

    return extractedDifficulty;
};

export { topicCategory, topicDifficulty };