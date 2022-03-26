import mongoose from "mongoose";
import PostMessage from "../Models/postMessage.js";

export const getPost = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
  const post = req.body;

  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this id");
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id }, //:TODO
    {
      new: true, //:TODO
    }
  );
  res.json(updatedPost);
  // const newPost = new PostMessage(post);
  // try {
  //   await newPost.save();
  //   res.status(201).json(newPost);
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this id");
  await PostMessage.findByIdAndRemove(_id);
  res.json("Post Deleteted Successfully");
};
export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this id");

  const post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};
