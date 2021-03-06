const { Schema, model, Types } = require('mongoose');

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    islive: { type: Boolean, required: true, default: false },
    user: { type: Types.ObjectId, required: true, ref: "users" },
  }, 
  { timestamps: true, versionKey:false }
);
const Posts = model('posts', PostSchema);
module.exports = { Posts }
