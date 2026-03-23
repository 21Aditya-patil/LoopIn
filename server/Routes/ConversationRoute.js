import express from "express";
import {
  createConversation,
  getUserConversations,
  findConversation,
  deleteConversation
} from "../Controllers/ConversationController.js";

const router = express.Router();

router.post("/", createConversation);
router.get("/:userId", getUserConversations);
router.get("/find/:firstId/:secondId", findConversation);
router.delete("/:id", deleteConversation);  


export default router;