import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    Container,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { countResults as countResultsAction } from "../../actions";
import {
    renderCheckboxAnswer,
    renderRadioAnswer,
    renderSelectAnswer,
    renderStringAnswer,
} from "./render-right-answer";

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    result: {
        marginBottom: theme.spacing(4),
    },
    answersListItem: {
        marginBottom: theme.spacing(3),
    },
}));

const renderAnswerOfGivenQuestion = (questionListItem, classes) => {
    switch (questionListItem.type) {
    case "string":
        return renderStringAnswer(questionListItem, classes);
    case "radio":
        return renderRadioAnswer(questionListItem, classes);
    case "select":
        return renderSelectAnswer(questionListItem, classes);
    case "checkbox":
        return renderCheckboxAnswer(questionListItem, classes);
    default:
        return null;
    }
};

const renderRightAnswers = (questions, classes) => (
    <>
        <Typography className={classes.title} variant="h5" component="h6">
            Правильные ответы
        </Typography>
        {questions.map(
            (questionListItem) => renderAnswerOfGivenQuestion(questionListItem, classes),
        )}
    </>
);

const ResultPage = ({
    questionsWithUserAnswer,
    correctAnswers,
    countResults,
    isTestDone,
}) => {
    useEffect(() => {
        countResults();
    }, [countResults]);

    const classes = useStyles();
    console.log(correctAnswers);
    if (!isTestDone) return <Redirect to="/" />;

    return (
        <Container maxWidth="md">
            <Typography className={classes.title} variant="h4" component="h6">
                Результат
            </Typography>
            <Typography className={classes.result} variant="subtitle1">
                {`Вы ответили правильно на ${correctAnswers} вопросов из ${questionsWithUserAnswer.length}`}
            </Typography>
            {renderRightAnswers(questionsWithUserAnswer, classes)}
        </Container>
    );
};

const mapStateToProps = ({
    questionsWithUserAnswer,
    correctAnswers,
    isTestDone,
}) => ({
    questionsWithUserAnswer,
    correctAnswers,
    isTestDone,
});

const mapDispatchToProps = {
    countResults: countResultsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
