const { Schema, model, Types } = require('mongoose');

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Types.ObjectId, required: true, ref: "users" },
    post: { type: Types.ObjectId, required: true, ref: "posts" },
  },
  { timestamps: true, versionKey:false }
);

const Comment = model('comments', CommentSchema);

module.exports = { Comment };