import mongoose from "mongoose";


export const CompanySchema = new mongoose.Schema({
    name: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	}
});
