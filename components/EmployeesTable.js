import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import LabelIcon from '@material-ui/icons/Label';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RateReviewIcon from '@material-ui/icons/RateReview';
import StarIcon from '@material-ui/icons/Star';

import { RemoveButton } from '@/components'
import { getRating, getReviewsStars } from '@/util/rating'

import {
	// setModalOpen,
	deleteEmployee,
	fetchEmployees,
	// setSelectedEmployee,
} from "@/store";

const useStyles = makeStyles((theme) => ({
	tableCell: {
		paddingLeft: "32px"
	}
}))


export function EmployeesTable() {
	const state = useSelector((state) => state.employee);
	const dispatch = useDispatch();
	const classes = useStyles()

	useEffect(() => {
		dispatch(fetchEmployees());
	}, [dispatch]);

	return (
		<TableContainer component={Paper}>
			<Table className="table">
				<TableHead>
					<TableRow>
						<TableCell>
							<ListItem >
								<ListItemIcon>
									<LabelIcon />
								</ListItemIcon>
								<ListItemText primary="Tag Names" />
							</ListItem>
						</TableCell>
						<TableCell>
							<ListItem >
								<ListItemIcon>
									<RateReviewIcon />
								</ListItemIcon>
								<ListItemText primary="Reviews" />
							</ListItem>
						</TableCell>
						<TableCell>
							<ListItem >
								<ListItemIcon>
									<StarIcon />
								</ListItemIcon>
								<ListItemText primary="Ratings" />
							</ListItem>
						</TableCell>
						<TableCell align="right">
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{state.employeeList.map(({ _id, tagName, reviews }) => (
						<TableRow key={_id}>
							{/* <TableCell>
								<b>{tagName}</b>
								<Link href="#" onClick={(event) => {
									event.preventDefault()
									dispatch(setSelectedEmployee(_id));
									dispatch(setModalOpen(true));
								}}><b>{name}</b></Link>
							</TableCell> */}
							<TableCell className={classes.tableCell}>
								<b>{tagName}</b>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<b>{reviews?.length}</b>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<b>{reviews && getRating(getReviewsStars(reviews)).toFixed(2)}</b>
							</TableCell>
							<TableCell align="right">
								<RemoveButton
									onRemoveAction={deleteEmployee}
									_id={_id}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
	
		</TableContainer>
	);
}
