
import clsx from 'clsx';
import React, { useEffect, useRef, memo, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, isOverflown } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import LabelIcon from '@material-ui/icons/Label';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import Rating from '@material-ui/lab/Rating'
import LinearProgress from '@material-ui/core/LinearProgress';
import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


import { Header } from "@/components";
import { periods } from "@/util/periodOptions"

import {
	fetchReviews,
} from "@/store";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    backgroundColor: {
        backgroundColor: "#FFF"
    },  
    image: {
        maxWidth: "50%"
    },
    card: {
        textAlign: "center",
        padding: "1.5rem",
        paddingBottom: "0rem",
        minHeight: "335px",
        "& p": {
            margin: 0,
            fontSize: "1.25rem",
            lineHeight: 1.5
        }
    },
    ratings: {
        textAlign: "left"
    },
    linearScore: {
        margin: "15px 0px"
    },
    sourceLogo: {
        display: "flex",
        height: "60px",
        alignItems: "center",
        justifyContent: "center"
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.06)",
        }
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    cardAction: {
        justifyContent: "center"
    },
    cardsGrid: {
        minHeight: "335px"
    }
  }));

const GridCellExpand = memo(function GridCellExpand(props) {
    const useStyles = makeStyles(() => ({
        root: {
          alignItems: 'center',
          lineHeight: '24px',
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          '& .cellValue': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
      }));

    const { width, value } = props;
    const wrapper = useRef(null);
    const cellDiv = useRef(null);
    const cellValue = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const [showFullCell, setShowFullCell] = useState(false);
    const [showPopper, setShowPopper] = useState(false);
  
    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };
  
    const handleMouseLeave = () => {
      setShowFullCell(false);
    };
  
    React.useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }
  
      function handleKeyDown(nativeEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          setShowFullCell(false);
        }
      }
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);
  
    return (
      <div
        ref={wrapper}
        className={classes.root}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cellDiv}
          style={{
            height: 1,
            width,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        <div ref={cellValue} className="cellValue">
          {value}
        </div>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -17 }}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current.offsetHeight - 3 }}
            >
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </div>
    );
});

function renderCellExpand(params) {
    return (
        <GridCellExpand
        value={params.value ? params.value.toString() : ''}
        width={params.colDef.width}
        />
    );
}

const columns = [
    { field: 'review_date', headerName: 'Date', type: 'date', flex: 0.2},
    {
        field: 'reviewer',
        headerName: 'Reviewer',
        renderCell: (params) => {
            return (
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <img style={{width: "25%", height: "25%", marginRight: "10px"}} src={params.row.reviewer.profile_picture} />
                    <b>{params.row.reviewer.name}</b>
                </div>
            )
        },
        flex: 0.3
    },
    {
        field: 'source_name',
        headerName: 'Source',
        renderCell: (params) => {
            const sources = {
                "Google": "/google-brands.svg",
                "TripAdvisor": "/tripadvisor-brands.svg",
                "Facebook": "/facebook-brands.svg"
            }
            return (
                <img alt={params.value} style={{width: "50%", height: "50%"}} src={sources[params.value]} />
            )
        },
    },
    {
        field: 'text',
        headerName: 'Review',
        flex: 1,
        renderCell: renderCellExpand
    },
    {
        field: 'rating',
        type: 'number',
        headerName: 'Rating',
        renderCell: (params) => (
            <div>
                <span><b>{params.value}</b> ⭐️</span>
            </div>
        ),
    }
]


export default function Reviews() {
    const [cursor, setCursor] = useState(1);
    const [expanded, setExpanded] = useState(false);
    const [period, setPeriod] = useState("ALL");
    const [searchTag, setSearchTag] = useState("");
    const [loading, setLoading] = useState(true);
    const state = useSelector((state) => state.review);
    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handlePageChange = (event) => {
        setCursor(event.page + 1)
    };

    const handleDateFilter = async (event) => {
        setPeriod(event.target.value);
    };

    const handleSearchTag = (event) => {
        setSearchTag(event.target.value);
    };

    const handleSubmit = () => {
        setLoading(true)
        dispatch(fetchReviews({cursor, period, searchTag}));
    }

    const classes = useStyles();

    useEffect(() => {
        if (state.reviewList?.docs) {
            setLoading(false)
        }
    }, [state])

	useEffect(() => {
        handleSubmit()
	}, [dispatch, period, cursor]);


    if (state.reviewList?.docs) {
        const sourceImages = {
            "TripAdvisor": "//rsvp-prod.s3.amazonaws.com/assets/review_sources/tripadvisor-147c55a8ad7fa668349050157045deca71f46a6066d101611874a0a6dd300e62.png",
            "Google": "//rsvp-prod.s3.amazonaws.com/assets/review_sources/google-f795bd168fc32d3c94d4b0f2f90ef622bd35e00dd94a643d3e74e8d50aee0450.png",
            "Facebook": "//rsvp-prod.s3.amazonaws.com/assets/review_sources/facebook-f5046a7865c34900afeea8962edba86b5529161ebb5c97ff9962e65ba03a23ad.png"
        }
        return (
            <React.Fragment>
                <Header title="reviews" />
                <Grid className={classes.cardsGrid} container spacing={2}>                
                {
                    state.reviewList.sources.map((source, index) => {
                        const {
                            rating,
                            total,
                            reviewsStars,
                            sourceName
                        } = source;
                        return (
                            <Grid key={index} item xs={12} md={4}>
                                <Card className={classes.card} variant="outlined">
                                    {
                                        loading ?
                                        <Skeleton animation="wave" width={"100%"} height={60} /> :
                                        <div className={classes.sourceLogo}>
                                            <img src={sourceImages[sourceName]} className={classes.image} />
                                        </div>
                                    }
                                    <CardContent>
                                        {
                                            loading ? 
                                            <React.Fragment>
                                                <Skeleton animation="wave" width={"100%"} />
                                                <Skeleton animation="wave" width={"100%"} style={{height: "100px"}} variant="rect" />
                                                <Skeleton animation="wave" width={"100%"} /> 
                                            </React.Fragment>: 
                                            <React.Fragment>
                                                <h2>{rating?.toFixed(1)}</h2>
                                                <Rating
                                                    size="large"
                                                    precision={0.5}
                                                    name="read-only"
                                                    value={rating}
                                                    readOnly
                                                />
                                                <p>{total} Reviews</p>
                                            </React.Fragment>
                                        }
                                        <CardActions className={classes.cardAction}>
                                            {
                                                loading ?
                                                <Skeleton animation="wave" variant="circle" width={40} height={40} />
                                                :
                                                <IconButton
                                                    className={clsx(classes.expand, {
                                                    [classes.expandOpen]: expanded,
                                                    })}
                                                    onClick={handleExpandClick}
                                                    aria-expanded={expanded}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMoreIcon />
                                                </IconButton>
                                            }
                                        </CardActions>
                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                            <div className={classes.ratings}>
                                                {
                                                    reviewsStars.map((reviewStar, index) => {
                                                        if (index != 5) {
                                                            return (
                                                                <div className={classes.linearScore} key={Math.abs(index - 5)}>
                                                                    {Math.abs(index - 5)} ⭐️ {reviewStar}
                                                                    <LinearProgress
                                                                        variant="determinate"
                                                                        value={total && reviewStar / total * 100 || 0}
                                                                    />
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>

                                        </Collapse>
                                    </CardContent>
                                </Card>
                            </Grid>                        
                        )
                    })
                } 
               </Grid>
                <Grid className={classes.margin} container spacing={1} alignItems="center">
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
                    <Grid item xs={10}>
                        <TextField
                            className={classes.backgroundColor}
                            variant="outlined" 
                            placeholder="Press Enter To Search..."
                            id="tag"
                            name="tag"
                            variant="outlined"
                            value={searchTag}
                            onChange={handleSearchTag}
                            onKeyPress={(event) => event.key === 'Enter' && handleSubmit()}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LabelIcon />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <DataGrid
                    autoHeight
                    pagination
                    loading={loading}
                    rowHeight={100}
                    className={classes.backgroundColor}
                    rows={state.reviewList?.docs}
                    columns={columns}
                    pageSize={state.reviewList.limit}
                    rowCount={state.reviewList.totalDocs}
                    paginationMode="server"
                    onPageChange={handlePageChange}
                />
            </React.Fragment>
        )
    }

    return <CircularProgress />

}