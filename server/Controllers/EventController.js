import EventModel from "../Models/eventModel.js";
import UserModel from "../Models/userModel.js";

// CREATE EVENT (Admin only)
export const createEvent = async (req, res) => {
  try {
    console.log("Incoming Body:", req.body);
    console.log("User from middleware:", req.user);

    const event = new EventModel(req.body);
    const savedEvent = await event.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.log("CREATE EVENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// DELETE EVENT (Admin only)
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const deletedEvent = await EventModel.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });

  } catch (error) {
    console.log("DELETE EVENT ERROR:", error);
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
