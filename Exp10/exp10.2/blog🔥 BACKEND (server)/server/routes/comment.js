const router = require("express").Router();
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.send("Comment added");
});

router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({postId: req.params.postId});
  res.json(comments);
});

module.exports = router;
