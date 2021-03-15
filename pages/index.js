import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RateReviewIcon from '@material-ui/icons/RateReview';
import StarIcon from '@material-ui/icons/Star';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import { indigo } from '@material-ui/core/colors';
import SpeedIcon from '@material-ui/icons/Speed';


import { fetchEmployees } from "@/store";
import { Header } from "@/components";
import { periods } from "@/util/periodOptions"
import { getRating, getReviewsStars, getScore } from '@/util/rating'


const useStyles = makeStyles((theme) => ({
  backgroundColor: {
    backgroundColor: "#FFF"
  },
  listSelected: {
    backgroundColor: "rgb(0, 0, 0, 0.04)"
  },
  margin: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  avatar: {
    fontSize: "1rem",
    backgroundColor: indigo[700],
  },
  gold: {
      color: theme.palette.getContrastText(indigo[700]),
      backgroundColor: "#FFD700",
      fontSize: "1rem"
  },
  silver: {
    color: theme.palette.getContrastText(indigo[700]),
    backgroundColor: "#C0C0C0",
    fontSize: "1rem"
  },
  bronze: {
    color: theme.palette.getContrastText(indigo[700]),
    backgroundColor: "#cd7f32",
    fontSize: "1rem"
  },
  tableCell: {
		paddingLeft: "32px"
	},
  listItem: {
    padding: 0,
  }
}))

export default function Home() {
	const state = useSelector((state) => state.employee);
	const dispatch = useDispatch();
	const classes = useStyles()

  const [period, setPeriod] = useState("ALL");

  const handleDateFilter = async (event) => {
    setPeriod(event.target.value);
  };

  const leaderboardSort = (a, b) => {
    const aReviews = a.reviews
    const bReviews = b.reviews

    return getScore(aReviews) > getScore(bReviews) ? -1 : 1
  }

  const getNumberWithOrdinal = (n) => {
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  const podium = ["gold", "silver", "bronze"]

	useEffect(() => {
		dispatch(fetchEmployees());
	}, [dispatch]);

  return (
    <React.Fragment>
      <Header title="leaderboard" />
      {/* <Grid className={classes.margin} container spacing={1} alignItems="center">
        <Grid item xs={2}>
          <TextField
              className={classes.backgroundColor}
              id="dateRange"
              name="date-range"
              value={period}
              onChange={handleDateFilter}
              variant="outlined"
              InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          <DateRangeIcon />
                      </InputAdornment>
                  ),
              }}
              select
              fullWidth
              >
              {periods.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                      {option.label}
                  </MenuItem>
              ))}
          </TextField>
          </Grid>
        </Grid> */}
        <TableContainer component={Paper}>
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <ListItem >
                    <ListItemIcon>
                      <EmojiEventsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rank" />
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
                <TableCell>
                  <ListItem >
                    <ListItemIcon>
                      <SpeedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Score" />
                  </ListItem>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.employeeList.sort(leaderboardSort).map(({ _id, tagName, reviews }, index) => (
                <TableRow className={!(index % 2) ? classes.listSelected : null } key={_id}>
                  <TableCell className={classes.tableCell}>
                    <ListItem className={classes.listItem}>

                        <ListItemAvatar>
                          <Avatar className={
                            index >= 0 && index <=2 ?
                              classes[podium[index]]
                              :
                              classes.avatar
                          }>
                            <b>{ getNumberWithOrdinal(index + 1) }</b>
                          </Avatar>
                        </ListItemAvatar>
                      
                      <ListItemText primary={<b>{tagName}</b>} />
                    </ListItem>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <b>{reviews?.length}</b>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <b>{reviews && getRating(getReviewsStars(reviews)).toFixed(2)}</b>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <b>{getScore(reviews)}</b>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      
        </TableContainer>
    </React.Fragment>
  )
}

