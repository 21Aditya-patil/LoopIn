import Message from "../Models/messageModel.js";
import Conversations from "../Models/conversationModel.js";

export const sendMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    // UPDATE conversation updatedAt
    await Conversations.findByIdAndUpdate(
      req.body.conversationId,
      { $set: { updatedAt: new Date() } }
    );

    const populatedMessage = await Message.findById(savedMessage._id)
      .populate("sender", "name profilePicture");

    res.status(200).json(populatedMessage);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).populate("sender", "name profilePicture");

    res.status(200).json(messages);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};