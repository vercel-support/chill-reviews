import React, { useState } from 'react';
import clsx from 'clsx';
import Head from 'next/head'

import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

import { Link } from '@/components'

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 0,
    maxWidth: '100%'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  drawerContainer: {
    overflow: 'auto',
  },
  drawerLastItemOpen: {
    width: drawerWidth,
    position: "fixed",
    bottom: 0,
    textAlign: "left",
    paddingBottom: 16,
  },
  drawerLastItemClosed: {
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 16,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export function DashboardLayout({
  children,
  title = 'Chill Reviews',
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <Container className={classes.root} disableGutters={true}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content="Chill Reviews" key="title" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        </Toolbar>
      </AppBar> */}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        {/* <Toolbar /> */}
        <List>
          <Link href="/">
            <ListItem button>
              <ListItemIcon><EmojiEventsIcon /></ListItemIcon>
              <ListItemText primary={<b>Leaderboard</b>} />
            </ListItem>
          </Link>
          <Link href="/reviews">
            <ListItem button>
              <ListItemIcon><RateReviewIcon /></ListItemIcon>
              <ListItemText primary={<b>Reviews</b>} />
            </ListItem>
          </Link>
          <Link href="/employees">
            <ListItem button>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary={<b>Employees</b>} />
            </ListItem>
          </Link>
          <ListItem
            button
            onClick={handleDrawerToggle}
            className={clsx({
              [classes.drawerLastItemOpen]: open,
              [classes.drawerLastItemClosed]: !open,
            })}
          >
            <ListItemIcon>
              {open ? <HighlightOffTwoToneIcon /> : <ChevronRightIcon />}
            </ListItemIcon>
            <ListItemText primary={open && "Close"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        {children}
      </main>
    </Container>
  )
}