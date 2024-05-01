import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;