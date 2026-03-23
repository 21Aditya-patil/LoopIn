import express from "express"
import { createPost, deletePost, getAllPosts, getPost, likePost, timelinePosts, updatePost, getUserPosts, addComment, savePost } from "../Controllers/PostController.js"

const router = new express.Router()

router.post("/", createPost)
router.get("/", getAllPosts)
router.get("/user/:userId", getUserPosts);  
router.get("/:id", getPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
router.put("/:id/like", likePost)
router.get("/:id/timeline", timelinePosts)
router.put("/:id/comment", addComment);
router.put("/:id/save", savePost);


export default router   