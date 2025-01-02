import { Request, Response } from "express";
import { CourseModel } from "../models/Course";

export const getCourse = async (req: Request, res: Response) => {
    try {
        const courseName = req.params.courseName;
        const course = await CourseModel.findOne({ title: courseName });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};