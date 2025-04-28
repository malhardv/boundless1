import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    title: {type: String, required: true},
    location: String,
    startDate: Date,
    endDate: Date,
    cost: Number,
    notes: String,
    quote: String,
    noteImages: [String],
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
}, { timestamps: true })

export default mongoose.model("Trip", tripSchema)