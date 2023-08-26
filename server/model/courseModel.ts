import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    imageLink: String,
    published: Boolean
});

export const Course = mongoose.model('Course',courseSchema);
