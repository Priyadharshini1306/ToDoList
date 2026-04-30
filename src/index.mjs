import express from "express";
import mongoose from "mongoose";
import taskRouter from "./routers/tasks.mjs";
const app = express();
app.use(express.json());
app.use(taskRouter);
const PORT = 3000;
mongoose.connect("mongodb://localhost/to_do_app")
.then(()=>{
    console.log("db is connected");
})
.catch((err)=>{
    console.log("db is not connected",err);
})
app.listen(PORT,()=>{
    console.log(`server is running on the port ${PORT}`);
})