import mongoose from "mongoose";

import { EntitiesSentimentSchema } from "@/schemas"

const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
const ReviewerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        validate: {
          validator: function(v) {
            return urlRegex.test(val);
          },
          message: props => `${props.value} is not a valid URL!`
        }
    }
});

export const ReviewSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    reviewDate: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    title: {
        type: String
    },
    url: {
        type: String,
        validate: {
            validator: function(v) {
              return urlRegex.test(val);
            },
            message: props => `${props.value} is not a valid URL!`
        },
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviewer: ReviewerSchema,
    sourceName: {
        type: String,
        required: true
    },
    entitiesSentiment: [EntitiesSentimentSchema],
    target: {
        type: String,
        required: true
    }
})

ReviewSchema.methods.ratingsPerSource = async (source) => {
    console.log("SOURCE", source)
    const result = await mongoose.model.Review.countDocuments().count()
    console.log("result", result)
}
