import express from "express"
import { createPost, deletePost, getPost, likePost, timelinePosts, updatePost } from "../Controllers/PostController.js"

const router = new express.Router()

router.post("/", createPost)
router.get("/:id", getPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
router.put("/:id/like", likePost)
router.get("/:id/timeline", timelinePosts)

export default router   