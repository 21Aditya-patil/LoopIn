import express from "express";
import {
  sendMessage,
  getMessages,
} from "../Controllers/MessageController.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/:conversationId", getMessages);

export default router;