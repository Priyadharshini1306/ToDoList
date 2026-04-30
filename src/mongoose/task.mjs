import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    description:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    status:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    priority:{
        type:mongoose.Schema.Types.String,
        required:true,
    }
})
export const Task = mongoose.model("Task",taskSchema);