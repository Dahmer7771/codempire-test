import React, { useEffect } from "react";
import "./app-header.scss";
import { connect } from "react-redux";
import {
    Link,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
    clearInputs as clearInputsAction,
    checkIfDataIsEntered as checkIfDataIsEnteredAction,
} from "../../actions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appHeaderLink: {
        "& > a": {
            textDecoration: "none",
            color: "inherit",
        },
    },
}));

const AppHeader = ({ isTestDone, clearInputs, checkIfDataIsEntered }) => {
    const classes = useStyles();
    const buttonStartAgain = isTestDone
        ? null
        : (
            <Button
                onClick={() => {
                    clearInputs();
                    checkIfDataIsEntered();
                }}
                color="inherit"
            >
                Начать сначала
            </Button>
        );

    useEffect(() => {
        checkIfDataIsEntered();
    }, [checkIfDataIsEntered]);


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <div className={classes.appHeaderLink}>
                            <Link to="/">
                                Test
                            </Link>
                        </div>
                    </Typography>
                    {buttonStartAgain}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = ({ answersList: { correctAnswers }, isTestDone }) => ({
    correctAnswers,
    isTestDone,
});

const mapDispatchToProps = {
    clearInputs: clearInputsAction,
    checkIfDataIsEntered: checkIfDataIsEnteredAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
