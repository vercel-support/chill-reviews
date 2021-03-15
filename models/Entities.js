import mongoose from "mongoose";

import { EntitySchema } from "@/schemas"

export default mongoose.models.Entity ||
    mongoose.model("Entity", EntitySchema)
