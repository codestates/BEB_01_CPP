const { Schema, model, Types } = require('mongoose');

const ethFauSchema = new Schema(
  {
    data: { type: String, required: true },
  },
  { timestamps: true, versionKey:false }
);

const Comment = model('comments', CommentSchema);

module.exports = { Comment };