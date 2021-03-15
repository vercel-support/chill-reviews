import Review from "@/models/Review";
import "@/util/dbConnect";
import { getReviewsStars, getRating } from "@/util/rating"

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":

			const re = req.query?.tag && req.query?.tag != '' && new RegExp(req.query?.tag, "i");
			const query = {
				...(re && { text: re }),
				...(req.query?.period && req.query?.period != "ALL" && {
					review_date: { $gte: req.query?.period }
			})}

			const reviewsPerSource = []
			const totalReviews = await Review.find(query).lean()

			const sources = ["TripAdvisor", "Google", "Facebook"]

			sources.forEach((source) => {
				const sourceReviews = totalReviews.filter(review => review.source_name === source)
				const reviewsStars = getReviewsStars(sourceReviews)
				const rating = getRating(reviewsStars)

				reviewsPerSource.push({
					rating,
					reviewsStars: [...reviewsStars].reverse(),
					total: sourceReviews.length,
					sourceName: source
				})
				return {}
			})

			try {
				const reviews = await Review
					.paginate(
						query,
						{
							page: parseInt(req.query?.page) || 1,
							limit: 10,
							sort: { review_date: -1 }
						}
					)
					.then((res) => {
						return res
					})
				return res.status(200).json({
					success: true,
					data: Object.assign({}, reviews, { sources: reviewsPerSource })
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
					error: error
				});
			}
		case "POST":
			try {
				const review = await Review.create(req.body);
				return res.status(201).json({
					success: true,
					data: review,
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