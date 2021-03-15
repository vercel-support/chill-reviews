import * as t from "../types";

export const fetchReviews = ({cursor, period, searchTag}) => {
	return {
		type: t.REVIEW_FETCH_REQUESTED,
		payload: {cursor, period, searchTag}
	};
};
