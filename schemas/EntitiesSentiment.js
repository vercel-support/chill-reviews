import mongoose from "mongoose";

const SentimentSchema = new mongoose.Schema({
    magnitude: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

const MentionsSchema = new mongoose.Schema({
    text: {
        content: {
            type: String,
            required: true
        },
        beginOffset: {
            type: Number,
            required: true
        }
    },
    type_: {
        type: Number,
        required: true
    },
    sentiment: SentimentSchema
})

export const EntitiesSentimentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type_: {
        type: Number,
        required: true
    },
    salience: {
        type: Number,
        required: true
    },
    mentions: [MentionsSchema],
    sentiment: SentimentSchema,
    metadata: {}
})
