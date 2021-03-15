import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: 'transparent',
        color: red[500],
        border: `1px solid ${red[500]}`,
        "&:hover": {
            backgroundColor: red[500],
            color: "white",
            border: "1px solid transparent"
        }
    }
}))

export function RemoveButton({onRemoveAction, _id}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
            <Button
                className={classes.button}
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => {
                    dispatch(onRemoveAction(_id));
                }}
            >
                REMOVE
            </Button>
    )
}


RemoveButton.propTypes = {
    onClickAction: PropTypes.func
}