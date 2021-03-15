import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	reviewList: [],
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
        case t.REVIEW_FETCH_SUCCEEDED:
            return {
                ...state,
                reviewList: action.payload,
            };
        default:
            return state;
    }
};

export default mainReducer;
