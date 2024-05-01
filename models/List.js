import mongoose from "mongoose";
const { Schema } = mongoose;

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tasks: [{
    description:{
      type:String,
      required:true
    },
    completed: {
      type: Boolean,
      default: false,
    },
  }],
}, { timestamps: true });

const List = mongoose.model('List', listSchema);
export default List;