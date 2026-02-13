import express from "express"
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../Controllers/EventController.js"

const router = express.Router()

router.post("/", createEvent)
router.put("/:id", updateEvent)
router.delete("/:id", deleteEvent)

router.get("/", getAllEvents)
router.get("/:id", getEventById)

export default router