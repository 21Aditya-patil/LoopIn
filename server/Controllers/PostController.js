import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";


// Common Populate Config (Reusable)
const populateOptions = [
  { path: "userId", select: "name profilePicture role" },
  { path: "comments.userId", select: "name profilePicture role" },
];


// Create Post
export const createPost = async (req, res) => {
  try {
    const newPost = new PostModel(req.body);
    await newPost.save();

    const populatedPost = await PostModel.findById(newPost._id)
      .populate(populateOptions);

    res.status(200).json(populatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};


// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate(populateOptions)
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};


// Get Single Post
export const getPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id)
      .populate(populateOptions);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};


// Update Post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json("Post not found");
    }

    if (post.userId.toString() === userId.toString()) {
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $set: req.body },
        { new: true }
      ).populate(populateOptions);

      return res.status(200).json(updatedPost);
    } else {
      return res.status(403).json("Action forbidden!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// Delete Post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (post.userId.toString() === userId) {
      await post.deleteOne();
      res.status(200).json("Post Deleted!");
    } else {
      res.status(403).json("Action forbidden!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// Get Posts By Specific User
export const getUserPosts = async (req, res) => {
  const userId = req.params.userId;

  try {
    const posts = await PostModel.find({ userId })
      .populate(populateOptions)
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};


// Like / Unlike
export const likePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (!post) return res.status(404).json("Post not found");

    const isLiked = post.likes.includes(userId);

    if (!isLiked) {
      await post.updateOne({ $push: { likes: userId } });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
    }

    const updatedPost = await PostModel.findById(postId)
      .populate(populateOptions);

    res.status(200).json(updatedPost);

  } catch (error) {
    res.status(500).json(error);
  }
};



// Timeline Posts
export const timelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId })
      .populate(populateOptions);

    const user = await UserModel.findById(userId);

    const followingPosts = await PostModel.find({
      userId: { $in: user.following }
    }).populate(populateOptions);

    const posts = [...currentUserPosts, ...followingPosts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json(error);
  }
};


// Add Comment
export const addComment = async (req, res) => {
  const postId = req.params.id;
  const { userId, text } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (!post) return res.status(404).json("Post not found");

    post.comments.push({
      userId,
      text,
      createdAt: new Date(),
    });

    await post.save();

    const updatedPost = await PostModel.findById(postId)
      .populate(populateOptions);

    res.status(200).json(updatedPost);

  } catch (error) {
    res.status(500).json(error);
  }
};


// Save / Unsave Post
export const savePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (!post) return res.status(404).json("Post not found");

    const isSaved = post.saved.includes(userId);

    if (!isSaved) {
      await post.updateOne({ $push: { saved: userId } });
    } else {
      await post.updateOne({ $pull: { saved: userId } });
    }

    const updatedPost = await PostModel.findById(postId)
      .populate(populateOptions);

    res.status(200).json(updatedPost);

  } catch (error) {
    res.status(500).json(error);
  }
};