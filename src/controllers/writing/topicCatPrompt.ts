
const topicCatPrompt = (topic: string): string => {
    const instruction = "define the type of this IELTS task 2 topic in Opinion, Discussion, Problem and Solution, Direct Question, or Advantage and Disadvantage with format of 'type: ': ";

    const prompt = instruction + topic;

    return prompt;
};

const topicDiffPrompt = (topic: string): string => {
    const instruction = "define the difficulty of this IELTS task 2 topic in Easy, Moderate, or Hard with format of 'difficulty: ': ";

    const prompt = instruction + topic;

    return prompt;
};

export { topicCatPrompt, topicDiffPrompt };