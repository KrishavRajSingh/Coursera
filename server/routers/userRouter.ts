import express from "express";
import jwt from "jsonwebtoken";
import {authenticateJWT} from "../middleware/auth";
import {User} from "../model/userModel";
import {Course} from "../model/courseModel";
import {secretKey} from "../secret";
import mongoose, { Types } from "mongoose";
const userRouter = express.Router()

userRouter.post('/signup', async(req, res) => {
    // logic to sign up user
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(user){
      return res.status(403).json({message: "User already exists"});
    }else{
      await User.create({username,password});
      const token = jwt.sign({username,role: "User"}, secretKey, {expiresIn: "1h"});
      return res.json({ message: 'User created successfully', token })
    }
  });
  
userRouter.post('/login', async (req, res) => {
    // logic to log in user
    const {username,password} = req.headers;
    const user = await User.findOne({username, password});
    if(user){
        const token = jwt.sign({username, role: "User"}, secretKey, {expiresIn: "1h"});
        return res.json({ message: 'Logged in successfully', token });
    }else{
        return res.status(401).json("Invalid user credentials");
    }
});

userRouter.get('/courses', authenticateJWT, async (req, res) => {
    // logic to list all courses
    return res.json({courses: await Course.find({published: true})});
});
// type CourseType = {
//     _id: Types.ObjectId
// }
userRouter.post('/courses/:courseId',authenticateJWT, async (req, res) => {
    // logic to purchase a course
    const course: Types.ObjectId | null = await Course.findById(req.params.courseId);
    if(course){
        const user = await User.findOne({username: req.headers.username});
        if(user){
        user.purchasedCourses.push(course);
        await user.save();
        return res.json({ message: 'Course purchased successfully' });
        }else{
        return res.status(401).json({message: "User not found"});
        }
    }else{
        return res.sendStatus(404);
    }
});

userRouter.get('/purchasedCourses', authenticateJWT, async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({username: req.headers.username}).populate("purchasedCourses");
    if(user){
        return res.json({purchasedCourses: user.purchasedCourses||[]})
    }else{
        return res.sendStatus(403);
    }
});

export default userRouter;