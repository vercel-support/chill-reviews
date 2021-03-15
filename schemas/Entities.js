import mongoose from "mongoose";

import { EntitiesSentimentSchema } from "@/schemas"


const ReviewerNameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const EntityReviewsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviewer: ReviewerNameSchema,
    sourceName: {
        type: String,
        required: true
    },
    entitiesSentiment: [EntitiesSentimentSchema]
})

export const EntitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            "UNKNOWN",
            "PERSON",
            "LOCATION",
            "ORGANIZATION",
            "EVENT",
            "WORK_OF_ART",
            "CONSUMER_GOOD",
            "OTHER",
            "PHONE_NUMBER",
            "ADDRESS",
            "DATE",
            "NUMBER",
            "PRICE"
        ]
    },
    instances: [EntityReviewsSchema]
})
