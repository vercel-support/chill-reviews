import Employee from "@/models/Employee";
import Review from "@/models/Review";

import "@/util/dbConnect";

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const employees = await Employee
					.find()
					.populate('reviews')
					.sort({
						createdAt: "desc",
					});

				return res.status(200).json({
					success: true,
					data: employees,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
					message: error
				});
			}
		case "POST":
			try {
				let employee = await Employee.create(req.body);

				const re = new RegExp(employee.tagName, "i");
				const result = await Review.find({"text": re}).select({ _id: 1 }).exec()

				employee.reviews = result
				await employee.save()

				employee = await Employee
					.findOne({_id: employee._id})
					.populate('reviews')

				return res.status(201).json({
					success: true,
					data: employee,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
					message: error
				});
			}
		default:
			res.setHeaders("Allow", ["GET", "POST"]);
			return res
				.status(405)
				.json({ success: false })
				.end(`Method ${method} Not Allowed`);
	}
};