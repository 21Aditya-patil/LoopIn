import express from "express"
import { createEvent, deleteEvent, getAllEvents, getEventById } from "../Controllers/EventController.js"
import { verifyToken } from "../middlewares/Auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router()

router.post("/create", verifyToken, isAdmin, createEvent);
router.delete("/:id", verifyToken, isAdmin, deleteEvent);

router.get("/", getAllEvents)
router.get("/:id", getEventById)

export default router