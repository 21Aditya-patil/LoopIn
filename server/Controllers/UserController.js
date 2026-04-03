import UserModel from "../Models/userModel.js";
import PostModel from "../Models/postModel.js";
import ConversationModel from "../Models/conversationModel.js";
import MessageModel from "../Models/messageModel.js";
import bcrypt from "bcrypt";

// Get All Users (for chat sidebar)
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get user
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user.toObject();

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists!");
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus, password } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true /*for returning new user in response*/,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("Access Denied! You can only update your own profile");
  }
};

// Delete user

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      // Delete all posts by the user
      await PostModel.deleteMany({ userId: id });

      // Delete all comments by the user from other posts
      await PostModel.updateMany(
        { "comments.userId": id },
        { $pull: { comments: { userId: id } } }
      );

      // Delete all conversations involving the user
      await ConversationModel.deleteMany({ members: id });

      // Delete all messages sent by the user
      await MessageModel.deleteMany({ sender: id });

      // Remove user from followers/following lists
      await UserModel.updateMany(
        { followers: id },
        { $pull: { followers: id } }
      );
      await UserModel.updateMany(
        { following: id },
        { $pull: { following: id } }
      );

      // Remove likes and saved posts from the user
      await PostModel.updateMany(
        { likes: id },
        { $pull: { likes: id } }
      );
      await PostModel.updateMany(
        { saved: id },
        { $pull: { saved: id } }
      );

      // Clear all tokens for the user
      await UserModel.findByIdAndUpdate(id, { tokens: [] });

      // Delete the user
      const user = await UserModel.findByIdAndDelete(id);
      res.status(200).json("User Deleted Successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("Access Denied! You can only delete your own profile");
  }
};

// Suggest Accounts
export const getSuggestions = async (req, res) => {
  const userId = req.params.userId;

  try {
    const currentUser = await UserModel.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const excludedIds = [currentUser._id, ...(currentUser.following || [])];

    const suggestions = await UserModel.aggregate([
      {
        $match: {
          _id: { $nin: excludedIds },
        },
      },
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          username: 1,
          profilePicture: 1,
          role: 1,
        },
      },
    ]);

    res.status(200).json(suggestions);
  } catch (error) {
    console.error("getSuggestions error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id; // user to follow
  const { currentUserId } = req.body;

  if (id === currentUserId) {
    return res
      .status(403)
      .json("Action Forbidden! You cannot follow yourself.");
  }

  try {
    const userToFollow = await UserModel.findById(id);
    const currentUser = await UserModel.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json("User not found");
    }

    if (!userToFollow.followers.includes(currentUserId)) {
      await userToFollow.updateOne({
        $push: { followers: currentUserId },
      });

      await currentUser.updateOne({
        $push: { following: id },
      });

      const updatedProfileUser = await UserModel.findById(id);
      const updatedCurrentUser = await UserModel.findById(currentUserId);

      res.status(200).json({
        profileUser: updatedProfileUser,
        currentUser: updatedCurrentUser,
      });
    } else {
      return res.status(400).json("Already following this user.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Unfollow a user
export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (id === currentUserId) {
    return res
      .status(403)
      .json("Action Forbidden! You cannot unfollow yourself.");
  }

  try {
    const userToUnfollow = await UserModel.findById(id);
    const currentUser = await UserModel.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json("User not found");
    }

    if (userToUnfollow.followers.includes(currentUserId)) {
      await userToUnfollow.updateOne({
        $pull: { followers: currentUserId },
      });

      await currentUser.updateOne({
        $pull: { following: id },
      });

      const updatedProfileUser = await UserModel.findById(id);
      const updatedCurrentUser = await UserModel.findById(currentUserId);

      res.status(200).json({
        profileUser: updatedProfileUser,
        currentUser: updatedCurrentUser,
      });
    } else {
      return res.status(400).json("You are not following this user.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
