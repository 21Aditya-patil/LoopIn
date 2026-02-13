import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        organizer: {
            type: String,
            required: true
        },
        img: String,
        venue: String,
        likes: [],
        share: [],
        saved: []
    },
    {
        timestamps: true
    }
)

const EventModel = mongoose.model("Events", eventSchema)

export default EventModel