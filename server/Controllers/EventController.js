import EventModel from "../Models/eventModel.js";
import UserModel from "../Models/userModel.js";

// CREATE EVENT (Admin only)
export const createEvent = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.findById(userId);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const event = new EventModel(req.body);
    const savedEvent = await event.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE EVENT (Admin only)
export const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(
      req.body.eventId, // or extract from route differently
      { $set: req.body },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE EVENT (Admin only)
export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const event = await EventModel.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EVENTS (Public)
export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE EVENT (Public)
export const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
