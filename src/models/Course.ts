import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    lectures: [{
        title: { type: String },
        videoUrl: { type: String }
    }]
});

export const CourseModel = mongoose.model('courses', CourseSchema);