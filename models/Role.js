import mongoose from "mongoose";

import { RoleSchema } from "@/schemas"

export default mongoose.models.Role ||
	mongoose.model("Role", RoleSchema);
