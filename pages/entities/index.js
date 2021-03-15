import React from 'react';
// import { connectToDatabase } from '../../util/mongodb'
// import PropTypes from 'prop-types';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// const useRowStyles = makeStyles({
//     root: {
//       '& > *': {
//         borderBottom: 'unset',
//       },
//     },
//   });

//   const StyledTableCell = withStyles((theme) => ({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }))(TableCell);
  
//   const StyledTableRow = withStyles((theme) => ({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
//   }))(TableRow);


// export async function getServerSideProps(context) {
//     const { client } = await connectToDatabase()
//     const db = client.db("reviewit")
  
//     const entities = JSON.parse(JSON.stringify(await db.collection("entities").find({}).toArray()))

//     return {
//         props: {
//             entities
//         }
//     }
// }

// function Row(props) {
//     // const { entity } = props;
//     // const [open, setOpen] = React.useState(false);
//     // const classes = useRowStyles();
  
//     return (
//       <React.Fragment>
//         <StyledTableRow className={classes.root}>
//           <StyledTableCell>
//             <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//               {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//             </IconButton>
//           </StyledTableCell>
//           <StyledTableCell component="th" scope="row">
//             {entity.name}
//           </StyledTableCell>
//           <StyledTableCell align="right">{entity.category}</StyledTableCell>
//         </StyledTableRow>
//         <StyledTableRow>
//           <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//             <Collapse in={open} timeout="auto" unmountOnExit>
//               <Box margin={1}>
//                 <Typography variant="h6" gutterBottom component="div">
//                   Instances
//                 </Typography>
//                 <Table size="small" aria-label="purchases">
//                   <TableHead>
//                     <StyledTableRow>
//                         <StyledTableCell>Customer</StyledTableCell>
//                         <StyledTableCell>Source</StyledTableCell>
//                         <StyledTableCell align="right">Rating</StyledTableCell>
//                     </StyledTableRow>
//                   </TableHead>
//                   <TableBody>
//                     {entity.instances.map((instance) => (
//                       <StyledTableRow key={instance._id}>
//                             <StyledTableCell>{instance.reviewer.name}</StyledTableCell>
//                             <StyledTableCell component="th" scope="row">
//                                 {instance.source_name}
//                             </StyledTableCell>
//                             <StyledTableCell align="right">{instance.rating}</StyledTableCell>
//                       </StyledTableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </Box>
//             </Collapse>
//           </StyledTableCell>
//         </StyledTableRow>
//       </React.Fragment>
//     );
//   }
  
//   export default function CollapsibleTable({ entities }) {
  export default function CollapsibleTable() {
    return (
        <div>
            <h1>Entities</h1>
            {/* <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                    <StyledTableRow style={{backgroundColor: "#EEEEEE"}}>
                        <StyledTableCell />
                        <StyledTableCell><b>NAME</b></StyledTableCell>
                        <StyledTableCell align="right"><b>CATEGORY</b></StyledTableCell>
                    </StyledTableRow>
                    </TableHead>
                    <TableBody>
                    {entities.map((entity) => (
                        <Row key={entity.name} entity={entity} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </div>
    );
  }