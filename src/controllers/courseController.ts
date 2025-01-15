import { Request, Response } from "express";
import { CourseModel } from "../models/Course";

export const addCourse = async (req: Request, res: Response) => {
    try {
        const { title, description, lectures } = req.body;

        // Validate the incoming data
        if (!title || !lectures || lectures.length === 0) {
            res.status(400).json({ message: "Title and at least one lecture are required." });
            return
        }

        // Create a new course instance
        const newCourse = new CourseModel({
            title,
            description,
            lectures
        });

        // Save the new course to the database
        await newCourse.save();

        // Respond with success message and the saved course data
        res.status(201).json({
            message: "Course created successfully",
            course: newCourse
        });
    } catch (err) {
        console.error("Error creating course:", err);
        res.status(500).json({ message: "Failed to create course" });
    }
};

export const getCourse = async (req: Request, res: Response) => {
    try {
        const courseName = req.params.courseName;
        const course = await CourseModel.findOne({ title: courseName });
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return
        }
        res.status(200).json(course);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    try {
        const { title, newLecture } = req.body;

        if (!title || !newLecture || !newLecture.title || !newLecture.videoUrl || !newLecture.notesPdf) {
            res.status(400).json({ message: "Course title and complete new lecture data are required." });
            return
        }

        const updatedCourse = await CourseModel.findOneAndUpdate(
            { title },
            { $push: { lectures: newLecture } },
            { new: true }
        );

        if (!updatedCourse) {
            res.status(404).json({ message: "Course not found." });
            return
        }

        res.status(200).json({
            message: "Lecture added successfully.",
            course: updatedCourse
        });
    } catch (err) {
        console.error("Error updating course:", err);
        res.status(500).json({ message: "Failed to update course." });
    }
};