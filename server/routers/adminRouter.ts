import express from "express";
import jwt from "jsonwebtoken";
import {authenticateJWT} from "../middleware/auth";
import {Admin} from "../model/adminModel";
import {Course} from "../model/courseModel";
import {secretKey} from "../secret";
const adminRouter = express.Router()


adminRouter
.route("/signup")
.post(async (req, res) => {
    // logic to sign up admin
    const {username,password} = req.body;
    const admin = await Admin.findOne({username});
    if(admin){
      return res.status(403).json({message: "Admin already exists"});
    }else{
      await Admin.create({username,password});
      const token = jwt.sign({username, role: "Admin"}, secretKey, {expiresIn: "1h"});
      return res.json({ message: 'Admin created successfully', token });
    }
});

adminRouter
.post('/login', async (req, res) => {
// logic to log in admin
    const {username,password} = req.headers;
    const admin = await Admin.findOne({username,password});
    if(admin){
        const token = jwt.sign({username, role: "Admin"}, secretKey, {expiresIn: "1h"});
        return res.json({ message: 'Logged in successfully', token });
    }else{
        return res.status(401).json({message: "Admin doesnn't exists"});
    }
});

adminRouter
.get("/me", authenticateJWT, async(req,res)=>{
    const user = req.headers;
    const admin = await Admin.findOne({ username: user.username});
    if(!admin){
        return res.status(403).json({msg: "Admin doesn't exists"});
    }
    return res.json({
        username: admin.username
    });
})

adminRouter
.post('/courses', authenticateJWT, async (req, res) => {
// logic to create a course
const user = req.headers;
if(user.role === "Admin"){
    const course = req.body;
    const newCourse = await Course.create(course);
    return res.json({ message: 'Course created successfully', courseId: newCourse._id });
}else{
    return res.sendStatus(403);
}
});

adminRouter
.get("/course/:courseId", authenticateJWT, async (req,res)=>{
    const user = req.headers;
    if(user.role === "Admin"){
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if(course)
        return res.json({course});
        else
        return res.status(404).json({message: "Course doesn't exists"});
    }else{
        return res.sendStatus(403);
    }
})

adminRouter
.put('/courses/:courseId', authenticateJWT, async (req, res) => {
// logic to edit a course
const user = req.headers;
    if(user.role === "Admin"){
        const course = await Course.findByIdAndUpdate(req.params.courseId, req.body);
        if(course){
        return res.json({message: "Course updated successfully"});
        }else{
        return res.status(404).json({message: "Course doesn't exists"});
        }
    }else{
        return res.sendStatus(403);
    }
});

adminRouter
.delete("/courses/:courseId", authenticateJWT, async(req,res)=> {
    const user = req.headers;
    if(user.role === "Admin"){
        const id = req.params.courseId;
        const course = await Course.findByIdAndDelete(id);
        if(course){
            return res.json({
                message: "Course deleted successfully",
                Course: course
            });
        }else{
            return res.status(404).json({message: "Course not fond"});
        }
    }else{
        return res.sendStatus(403);
    }
})

adminRouter
.get('/courses', authenticateJWT, async (req, res) => {
// logic to get all courses
const user = req.headers;
if(user.role === "Admin"){
    return res.json({courses: await Course.find()});
}else{
    return res.sendStatus(403);
}
});

export default adminRouter;