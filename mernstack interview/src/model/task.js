import mongoose from "mongoose";

const taskManager = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  
},
{
  timestamps:true,
},);


const Task= mongoose.model("Task",taskManager);
export default Task;