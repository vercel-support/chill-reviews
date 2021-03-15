import { combineReducers } from "redux";
import employeeReducer from "./employee";
import reviewReducer from "./review";

const rootReducer = combineReducers({
	employee: employeeReducer,
	review: reviewReducer
});

export default rootReducer;