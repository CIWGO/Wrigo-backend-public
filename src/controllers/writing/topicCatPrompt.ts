
const topicCatPrompt = (topic: string): object => {
    const instruction = "define the type of this IELTS task 2 topic in Opinion, Discussion, Problem and Solution, Direct Question, or Advantage and Disadvantage with format of 'type: ': ";

    const prompt = [{
        "role": "user",
        "content": instruction + topic,
    }];

    return prompt;
};

const topicDiffPrompt = (topic: string): object => {
    const instruction = "define the difficulty of this IELTS task 2 topic in Easy, Moderate, or Hard with format of 'difficulty: ': ";

    const prompt = [{
        "role": "user",
        "content": instruction + topic,
    }];

    return prompt;
};

export { topicCatPrompt, topicDiffPrompt };