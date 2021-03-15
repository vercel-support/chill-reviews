import mongoose from "mongoose";

const tagRegex = /^[A-Za-z]+$/

const EmployeeSchema = new mongoose.Schema({
	tagName: {
		type: String,
		unique: true,
		required: [true, "Tag is required!"],
		trim: true,
        validate: {
			validator: function(v) {
			  return tagRegex.test(v);
			},
			message: props => `${props.value} is not a valid Tag Name!`
		  }
	},
	reviews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Review"
	}],
	createdAt: { type: Date, default: Date.now },
});

EmployeeSchema.methods.rating = async function() {
	const ratingPromise = new Promise((resolve, reject) => {
		this.populate('reviews', function(err, result) {
			const reviewsRatings = new Array(5).fill(0);
	
			result.reviews.forEach(element => {
				reviewsRatings[element.rating] ? reviewsRatings[element.rating] += 1 : reviewsRatings[element.rating] = 1;
			});
	
			const rating = (
				5*reviewsRatings[5]
				+ 4*reviewsRatings[4] 
				+ 3*reviewsRatings[3]
				+ 2*reviewsRatings[2]
				+ 1*reviewsRatings[1]
			) / (
				reviewsRatings[5]
				+ reviewsRatings[4]
				+ reviewsRatings[3]
				+ reviewsRatings[2]
				+ reviewsRatings[1]
			)
			resolve(rating)
		})
	});

	return await ratingPromise.then(rating => rating)
}
  

export default mongoose.models.Employee ||
	mongoose.model("Employee", EmployeeSchema);
