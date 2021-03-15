import mongoose from "mongoose";

import { CompanySchema } from "@/schemas"

export default mongoose.models.Company ||
	mongoose.model("Company", CompanySchema);
