import express from "express";
import {Task} from "../mongoose/task.mjs";
const router = express();
router.post("/api/tasks/add",async (req,res)=>{
    const {title,description,status,priority} = req.body;
    if(!title||!description||!status||!priority){
        return res.status(400).json({message:"all fields are required"});
    }
    else{
        try{
            const newTask = new Task({title,description,status,priority});
            const savedTask = await newTask.save();
            return res.status(200).json({message:"task added successfully",task: savedTask});
        }
        catch(err)
        {
            return res.status(500).send({message:"failed to add the task",error: err.msg});
        }
    }
})
router.get("/api/tasks/get",async (req,res)=>{
    try{
        const tasks = await Task.find();
        return res.status(200).json({tasks});
    }
    catch(err)
    {
        return res.status(500).send({message:"failed to fetch the tasks",error: err.msg});
    }
})
router.put("/api/tasks/update/:_id",async (req,res)=>{
    const {_id} = req.params;
    const {title,description,status,priority} = req.body;
    if(!title||!description||!status||!priority){
        return res.status(400).send({msg:"All fields are required"});
    }
    try{
        const updatedTask = await Task.findByIdAndUpdate(_id,{title,description,status,priority},{new:true});
        if(!updatedTask){
            return res.status(404).send({msg:"task not found"});
        }
        return res.status(200).send({msg:"task updatedSuccessfully",task:updatedTask});
    }
    catch(err)
    {
        return res.status(500).send({msg:"failed to update the task",error: err.msg});
    }
})
router.delete("/api/tasks/delete/:id",async (req,res)=>{
    const {_id}=req.params;
    try{
        const deletedTask = await Task.findByIdAndDelete(_id);
        if(!deletedTask)
        {
            return res.status(400).send({msg:"task not found"});
        }
        return res.status(200).send({msg:"task deleted successfully"});
    }
    catch(err)
    {
        return res.status(500).send({msg:"failed to delete the task",error: err.msg});
    }
});
router.patch("/api/tasks/update-status/:_id",async (req,res)=>{
    const {_id} = req.params;
    const {status}=req.body;
    if(!status)
    {
        return res.status(400).send({msg:"status is required"});
    }
    try{
        const updatedTask = await Task.findByIdAndUpdate(_id,{status},{new:true});
        if(!updatedTask){
            return res.status(404).send({msg:"task not found"});
        }
        return res.status(200).send({msg:"task status updated successfully",task:updatedTask});
    }
    catch(err)
    {
        return res.status(500).send({msg:"failed to update the task status",error: err.msg});
    }
});
export default router;