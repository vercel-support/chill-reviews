import mongoose from "mongoose";

import { EntitiesSentimentSchema } from "@/schemas"

export default mongoose.models.EntitiesSentiment ||
    mongoose.model("EntitiesSentiment", EntitiesSentimentSchema);