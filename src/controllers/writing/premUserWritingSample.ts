import { Request, Response } from "express";
import { openAIRequest } from "../../utils/openAIRequest";
import { samplePrompt } from "./samplePrompt";
import { createOperationLog } from "../log";
/**
 * take topic from user input and generate a prompt for sample writing
 * user res to send the writing sample back to users
 * @param {Request} req request from users
 * @param {Response} res respond to users
 */

const premWritingSample = async (req: Request, res: Response) => {
  try {
    const { uid, topic_content } = req.body;

    const promptSample = samplePrompt(topic_content);
    const responseSample = await openAIRequest(promptSample, true);
    const regexSample = /Content:\s*([\s\S]+)/i;
    const sampleContent = await responseSample.match(regexSample)[1];

    createOperationLog(
      true,
      "ApiCall",
      `User (uid: ${uid}) successfully gets writing sample.`,
      req.userIP,
      req.userDevice,
      uid
    );

    return res.status(200).json({ content: sampleContent });
  } catch (error) {
    const uid = req.body.uid;
    createOperationLog(
      true,
      "ApiCall",
      `User (uid: ${uid}) failed to get writing sample. ${error || "Failed to get response"}`,
      req.userIP,
      req.userDevice,
      uid
    );

    return res.status(500).json({ error: error.message || "Failed to get writing sample" });
  }
};

export { premWritingSample };