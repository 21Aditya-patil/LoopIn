import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    desc: String,
    likes: [],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    saved: [],
    share: [],
    media: [String],
  },
  {
    timestamps: true,
  },
);

const PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
