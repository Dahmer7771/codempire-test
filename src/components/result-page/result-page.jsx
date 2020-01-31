import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    Container,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { countResults as countResultsAction } from "../../actions";

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(2),
    },
}));

const ResultPage = ({
    answers,
    correctAnswers,
    countResults,
    isTestDone,
}) => {
    useEffect(() => {
        countResults();
    }, [countResults]);

    const classes = useStyles();

    if (!isTestDone) return <Redirect to="/" />;

    return (
        <Container maxWidth="md">
            <Typography className={classes.title} variant="h4" component="h6">
                Ответы
            </Typography>
            <Typography variant="subtitle1">
                {`Вы ответили правильно на ${correctAnswers} вопросов из ${answers.length}`}
            </Typography>
        </Container>
    );
};

const mapStateToProps = ({ answersList: { answers, correctAnswers }, isTestDone }) => ({
    answers,
    correctAnswers,
    isTestDone,
});

const mapDispatchToProps = {
    countResults: countResultsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
