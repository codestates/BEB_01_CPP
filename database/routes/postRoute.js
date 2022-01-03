const { Router } = require("express");
const postRouter = Router();
const { Posts, Users } = require("../models");
const { isValidObjectId } = require("mongoose");
const { commentRouter } = require("./commentRoute");

postRouter.use('/:postId/comment', commentRouter);

postRouter.post("/", async (req, res) => {
  try {
    const { title, content, islive, userId } = req.body;
    if (typeof title !== "string")
      res.status(400).send({ err: "title is required" });
    if (typeof content !== "string")
      res.status(400).send({ err: "content is required" });
    if (islive && islive !== "boolean")
      res.status(400).send({ err: "islive must be a boolean" });
    if (!isValidObjectId(userId))
      res.status(400).send({ err: "userId is invalid" });
    let user = await Users.findById({ _id: userId });
    if (!user) res.status(400).send({ err: "user does not exist" });

    let posts = new Posts({ ...req.body, user });
    await posts.save();
    return res.send({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const posts = await Posts.find({});
    return res.send({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

postRouter.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    if (!isValidObjectId(postId))
      return res.status(400).send({ err: "Invalid postId" });
  
    const posts = await Posts.findOne({ _id: postId });
    return res.send({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

postRouter.put("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    if (!isValidObjectId(postId))
      return res.status(400).send({ err: "Invalid postId" });
  
    const { title, content } = req.body;
    if (typeof title !== "string")
      return res.status(400).send({ err: "title is required" });
    if (typeof content !== "string")
      return res.status(400).send({ err: "content is required" });
    
    const posts = await Posts.findOneAndUpdate(
      { _id: postId },
      { title, content },
      { new: true }
    );
    return res.send({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

postRouter.patch("/:postId/live", async (req, res) => {
  try {
    const { postId } = req.params;
    if (!isValidObjectId(postId))
      return res.status(400).send({ err: "Invalid postId" });
  
    const { islive } = req.body;
    if (typeof islive !== "boolean")
      return res.status(400).send({ err: "boolean islive is required" });
  
    const posts = await Posts.findByIdAndUpdate(
      postId ,
      { islive },
      { new: true }
    );
    return res.send({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

module.exports = { postRouter };