import { all, put, takeLatest } from "redux-saga/effects";
import * as t from "../types";

function* fetchEmployees() {
	try {
		const response = yield fetch("/api/employees");

		const employeeList = yield response.json();

		yield put({
			type: t.EMPLOYEE_FETCH_SUCCEEDED,
			payload: employeeList.data,
		});
	} catch (error) {
		yield put({
			type: t.EMPLOYEE_FETCH_FAILED,
			payload: error.message,
		});
	}
}

function* watchFetchEmployees() {
	yield takeLatest(t.EMPLOYEE_FETCH_REQUESTED, fetchEmployees);
}

function* addEmployee(action) {
	try {
		const response = yield fetch("/api/employees", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const newEmployee = yield response.json();

		yield put({
			type: t.EMPLOYEE_ADD_SUCCEEDED,
			payload: newEmployee.data,
		});
	} catch (error) {
		yield put({
			type: t.EMPLOYEE_ADD_FAILED,
			payload: error.message,
		});
	}
}

function* watchAddEmployee() {
	yield takeLatest(t.EMPLOYEE_ADD_REQUESTED, addEmployee);
}

function* deleteEmployee(action) {
	try {
		const response = yield fetch("/api/employees/" + action.payload, {
			method: "DELETE",
		});

		const deletedEmployee = yield response.json();

		yield put({
			type: t.EMPLOYEE_DELETE_SUCCEEDED,
			payload: deletedEmployee.data.id,
		});
	} catch (error) {
		yield put({
			type: t.EMPLOYEE_DELETE_FAILED,
			payload: error.message,
		});
	}
}

function* watchRemoveEmployee() {
	yield takeLatest(t.EMPLOYEE_DELETE_REQUESTED, deleteEmployee);
}

function* updateEmployee(action) {
	try {
		const response = yield fetch("/api/employees/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedEmployee = yield response.json();

		yield put({
			type: t.EMPLOYEE_UPDATE_SUCCEEDED,
			payload: updatedEmployee.data,
		});
	} catch (error) {
		yield put({
			type: t.EMPLOYEE_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

function* watchUpdateEmployee() {
	yield takeLatest(t.EMPLOYEE_UPDATE_REQUESTED, updateEmployee);
}


function* fetchReviews(action) {
	const { cursor, period, searchTag } = action.payload
	try {
		const response = yield fetch(`/api/reviews/?page=${cursor}&period=${period}&tag=${searchTag}`);

		const reviewList = yield response.json();

		yield put({
			type: t.REVIEW_FETCH_SUCCEEDED,
			payload: reviewList.data,
		});
	} catch (error) {
		yield put({
			type: t.REVIEW_FETCH_FAILED,
			payload: error.message,
		});
	}
}

function* watchFetchReviews() {
	yield takeLatest(t.REVIEW_FETCH_REQUESTED, fetchReviews);
}

export default function* rootSaga() {
	yield all([
		watchFetchEmployees(),
		watchAddEmployee(),
		watchRemoveEmployee(),
		watchUpdateEmployee(),
		watchFetchReviews(),
	]);
}