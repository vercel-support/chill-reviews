import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AddButton } from "@/components";

const useStyles = makeStyles((theme) => ({
	header: {
		position: "relative",
		padding: "20px 0",
		"& h2": {
			fontWeight: "400"
		},
		"& button": {
			position: "absolute",
			right: 0,
			top: "50%",
			transform: "translateY(-50%)"
		}
	},
}))

export function Header({title, action}) {
	const classes = useStyles();
	return (
		<header className={classes.header}>
			<h2>
				{title.toUpperCase()}
			</h2>
			{action && <AddButton onClickAction={action} />}
		</header>
	);
}

Header.propTypes = {
	title: PropTypes.string.isRequired,
	action: PropTypes.func
  };