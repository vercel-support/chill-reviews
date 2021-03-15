import mongoose from "mongoose";


export const RoleSchema = new mongoose.Schema({
    name: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	}
});
