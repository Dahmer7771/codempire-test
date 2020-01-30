import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
    progressBar: {
        position: "absolute",
        left: "calc(50% - 20px)",
        top: "calc(50% - 20px)",
    },
}));

const Spinner = () => {
    const classes = useStyles();

    return (
        <CircularProgress className={classes.progressBar} />
    );
};

export default Spinner;
