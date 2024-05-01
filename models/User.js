import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'List',
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;