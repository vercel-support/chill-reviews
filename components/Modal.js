import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import {
	addEmployee,
	setModalOpen,
	setSelectedEmployee,
	updateEmployee,
} from "@/store";


export function Modal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();

	const state = useSelector((state) => state.employee);
	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setModalOpen(false));
		dispatch(setSelectedEmployee(undefined));
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
		if (state.selectedEmployee) {
			dispatch(
				updateEmployee({
					_id: state.selectedEmployee._id,
					...data,
				})
			);
		} else {
			dispatch(addEmployee(data));
		}
	};

	useEffect(() => {
		if (state.selectedEmployee) {
			setValue("name", state.selectedEmployee.name);
			setValue("email", state.selectedEmployee.email);
			setValue("address", state.selectedEmployee.address);
			setValue("phone", state.selectedEmployee.phone);
		}
	}, [state.selectedEmployee, setValue]);
	return (
		<Dialog
			open={state.isModalOpen}
			onClose={closeModal}
			fullWidth
		>
			<DialogTitle id="form-dialog-title">
				{state.selectedEmployee ? (
					<>
						Edit <span>Employee</span>
					</>
				) : (
					<>
						Add <span>Employee</span>
					</>
				)}
			</DialogTitle>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				noValidate
			>
				<DialogContent dividers>
					<TextField
						error={errors.tagName && true}
						helperText={
							errors?.tagName?.message || errors?.tagName?.type === "uniqueNameTag" && "Tag Names Must Be Unique!"
						}
						label="Tag Name"
						inputRef={register({
							required: "Tag Name Is Required!",
							pattern: {
								value: /^[A-Za-z]+$/i,
								message: "No Spaces, Numbers or Special Characters Allowed"
							},
							validate: {
								uniqueNameTag: value => {
									const re = new RegExp(`^${value}$`, "i");
									return state.employeeList.filter(employee => re.test(employee.tagName)).length === 0
								},
							}
						})}
						id="tagNameInput"
						name="tagName"
						variant="outlined"
						margin="normal"
						fullWidth
						autoFocus
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeModal} color="primary">
						<CloseIcon /> Cancel
					</Button>
					<Button color="primary" type="submit">
						<CheckIcon /> {state.selectedEmployee ? "Update" : "Create"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
