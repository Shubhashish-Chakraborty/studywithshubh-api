import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: { type: String , default:"" }
    // courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

export const UserModel = mongoose.model('users', UserSchema);