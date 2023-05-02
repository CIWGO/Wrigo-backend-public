import {writing, feedback} from "../../models/index";
import { Request, Response } from "express";

const deleteWritings = async (req: Request, res: Response) => {
    const {writing_id, uid} = req.body;
    try {
        const writingContent = await writing.findOne({writing_id, uid}).exec();
        if (writingContent){
            const feedbacks = await feedback.find({writing_id}).exec();
            await writing.deleteMany({ writing_id }).exec();
            if (feedbacks.length > 0) {
                await feedback.deleteMany({writing_id}).exec();
                return res.status(200).json({message: "success"});
            } else {
                return res.status(200).json({ message: "There is no feedback of this writing. Writing delete successfully" });
            }
        } else {
            return res.status(404).json({ error: "Writing not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || "Failed to get response" });
    }
};

export {deleteWritings};