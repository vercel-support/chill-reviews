import mongoose from "mongoose";

const ReviewsSourceSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    
})