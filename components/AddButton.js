import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: 'transparent',
        color: green[500],
        border: `1px solid ${green[500]}`,
        "&:hover": {
            backgroundColor: green[500],
            color: "white",
            border: "1px solid transparent"
        }
    }
}))

export function AddButton({onClickAction}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
            <Button
                className={classes.button}
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={() => {
                    dispatch(onClickAction(true));
                }}
            >
                NEW
            </Button>
    )
}


AddButton.propTypes = {
    onClickAction: PropTypes.func
}