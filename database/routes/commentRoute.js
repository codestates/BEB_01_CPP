const { Router } = require("express");
const commentRouter = Router({ mergeParams: true });
const { Posts, Users, Comment } = require("../models");
const { isValidObjectId } = require("mongoose");

commentRouter.post("/", async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, userId } = req.body;
    if (!isValidObjectId(postId))
      return res.status(400).send({ err: "postId is invalid" });
    if (!isValidObjectId(userId))
      return res.status(400).send({ err: "userId is invalid" });
    if (typeof content !== "string")
      return res.status(400).send({ err: "content is required" });

    const [ post, user ] = await Promise.all([
      Posts.findByIdAndUpdate(postId),
      Users.findByIdAndUpdate(userId),
    ]);  
    if (!post || !user)
      return res.status(400).send({ err: "post or user does not exist" });
    if(!post.islive) return res.status(400).send({ err: "post is not available" });
    const comment = new Comment({ content, user, post });
    await comment.save();
    return res.send({ comment });
  } catch(err){
    return res.status(500).send({ err: err.message });    
  }
});

commentRouter.get("/", async (req, res) => {
  const { postId } = req.params;
  if (!isValidObjectId(postId))
    return res.status(400).send({ err: "postId is invalid" });

  const comments = await Comment.find({ post: postId });
  return res.send({ comments });
});

module.exports = { commentRouter };