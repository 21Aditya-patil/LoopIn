import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

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
      const user = await UserModel.findByIdAndDelete(id);
      res.status(200).json("User Deleted Successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json("Access Denied! You can only delete your own profile");
  }
};

// Follow a user
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (id === currentUserId) {
    //if the user tries to follow himself
    res.status(403).json("Action Forbidden!");
  }

  try {
    const followUser = await UserModel.findById(id);
    const follwingUser = await UserModel.findById(currentUserId);

    if (!followUser.followers.includes(currentUserId)) {
      await followUser.updateOne({ $push: { followers: currentUserId } });
      await follwingUser.updateOne({ $push: { following: id } });

      res.status(200).json("User followed!");
    } else {
      res.status(403).json("User is already followed by you!");
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
    //if the user tries to follow himself
    res.status(403).json("Action Forbidden!");
  }

  try {
    const followUser = await UserModel.findById(id);
    const follwingUser = await UserModel.findById(currentUserId);

    if (followUser.followers.includes(currentUserId)) {
      await followUser.updateOne({ $pull: { followers: currentUserId } });
      await follwingUser.updateOne({ $pull: { following: id } });

      res.status(200).json("User unfollowed!");
    } else {
      res.status(403).json("User is not followed by you!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
