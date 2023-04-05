import { openAIRequest } from "../../utils/openAIRequest";
import {
  samplePrompt,
  samplePromptTR,
  samplePromptCC,
  samplePromptLR,
  samplePromptGRA
} from "./samplePrompt";
import { v4 as uuidv4 } from "uuid";
import { sampleWriting as SampleModel } from "../../models";

const writingSample = async (topic_id: string, topic_content: string) => {
  try {
    // get sample writing
    const promptSample = samplePrompt(topic_content);
    const responseSample = await openAIRequest(promptSample, true);
    const regexSample = /Content:\s*([\s\S]+)/i;
    const sampleContent = await responseSample.match(regexSample)[1];

    // get feedback of sample writing
    const promptTR = samplePromptTR(topic_content, sampleContent);
    const promptCC = samplePromptCC(topic_content, sampleContent);
    const promptLR = samplePromptLR(topic_content, sampleContent);
    const promptGRA = samplePromptGRA(topic_content, sampleContent);

    // post requests to openai api
    const responseTR = await openAIRequest(promptTR, true);
    const responseCC = await openAIRequest(promptCC, true);
    const responseLR = await openAIRequest(promptLR, true);
    const responseGRA = await openAIRequest(promptGRA, true);

    const regexTR = /\d+\.\d+/;
    const regexCC = /\d+\.\d+/;
    const regexLR = /\d+\.\d+/;
    const regexGRA = /\d+\.\d+/;

    const extractedScoreTR = await responseTR.match(regexTR)[0];
    const extractedScoreCC = await responseCC.match(regexCC)[0];
    const extractedScoreLR = await responseLR.match(regexLR)[0];
    const extractedScoreGRA = await responseGRA.match(regexGRA)[0];

    const extractedTextTR = await responseTR.replace(regexTR, "");
    const extractedTextCC = await responseCC.replace(regexCC, "");
    const extractedTextLR = await responseLR.replace(regexLR, "");
    const extractedTextGRA = await responseGRA.replace(regexGRA, "");

    const sampleWriting = new SampleModel({
      topic_id: topic_id,
      sampleWriting_id: uuidv4(),
      sampleWriting_content: sampleContent,
      sampleFeedback_TR: extractedTextTR,
      sampleFeedback_CC: extractedTextCC,
      sampleFeedback_LR: extractedTextLR,
      sampleFeedback_GRA: extractedTextGRA,
      sampleScore_TR: extractedScoreTR,
      sampleScore_CC: extractedScoreCC,
      sampleScore_LR: extractedScoreLR,
      sampleScore_GRA: extractedScoreGRA,
    });
    await sampleWriting.save();

  } catch (error) {
    console.log(error);
  }

};

export { writingSample };