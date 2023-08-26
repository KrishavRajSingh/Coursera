import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import adminRouter from "./routers/adminRouter";
import userRouter from "./routers/userRouter";
// import userRouter from "./routers/userRouter";

const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect('mongodb+srv://krishavrajsingh:8UXNManabyBpq6Av@cluster0.g0vjciy.mongodb.net/course-app')

// const conn = mongoose.createConnection('mongodb+srv://krishavrajsingh:8UXNManabyBpq6Av@cluster0.g0vjciy.mongodb.net/course-app').
//   asPromise().then(()=>{
// console.log("ko");
//     conn.readyState; 
//   })

app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
