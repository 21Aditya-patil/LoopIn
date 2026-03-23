import Conversations from "../Models/conversationModel.js";
import Message from "../Models/messageModel.js";

export const createConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Check if conversation already exists
    let conversation = await Conversations.findOne({
      members: { $all: [senderId, receiverId] },
    });

    // If not exists → create new
    if (!conversation) {
      conversation = await Conversations.create({
        members: [senderId, receiverId],
      });
    }

    // Populate members before sending
    const populatedConversation = await Conversations.findById(
      conversation._id
    ).populate("members", "name profilePicture");

    res.status(200).json(populatedConversation);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversations.find({
      members: { $in: [req.params.userId] },
    })
      .populate("members", "name profilePicture")
      .sort({ updatedAt: -1 }); // newest first

    res.status(200).json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const findConversation = async (req, res) => {
  try {
    const chat = await Conversations.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    }).populate("members", "name profilePicture");

    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    await Conversations.findByIdAndDelete(req.params.id);

    // Also delete related messages
    await Message.deleteMany({
      conversationId: req.params.id,
    });

    res.status(200).json("Conversation deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};