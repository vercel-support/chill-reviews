export function getReviewsStars(reviews) {
    const reviewsStars = new Array(6).fill(0)
	
    reviews.forEach(review => {
        reviewsStars[review.rating] ? reviewsStars[review.rating] += 1 : reviewsStars[review.rating] = 1;
    });

    return reviewsStars
}

export function getRating(reviewsStars) {
    const sectionOne = (
        5*reviewsStars[5]
        + 4*reviewsStars[4] 
        + 3*reviewsStars[3]
        + 2*reviewsStars[2]
        + 1*reviewsStars[1]
    )

    const sectionTwo = (
        reviewsStars[5]
        + reviewsStars[4]
        + reviewsStars[3]
        + reviewsStars[2]
        + reviewsStars[1]
    )

    return sectionOne === 0 ? 0 : sectionOne / sectionTwo    
}

export const getScore = (reviews) => {
    const scoreRating = [-10, -5, 1, 2, 3]
    
    const score = getReviewsStars(reviews).slice(1).map((reviewsPerStar, index) => {
        return scoreRating[index] * reviewsPerStar
    }).reduce((total, num) => total + num)
    
    return score
  }
