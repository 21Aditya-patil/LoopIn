import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversations", conversationSchema);