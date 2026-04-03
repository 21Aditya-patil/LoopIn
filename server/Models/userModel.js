import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty","admin"],
      default: "student",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    stream: String,
    skills: [],
    followers: [],
    following: [],
    saved: [],
    posts: [],
    tokens: [],
  },
  { timestamps: true },
);

const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default UserModel;
