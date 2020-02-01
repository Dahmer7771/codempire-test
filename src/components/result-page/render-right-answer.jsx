import React from "react";
import { Typography } from "@material-ui/core";

const renderStringAnswer = (questionListItem, classes) => (
    <div key={questionListItem.id} className={classes.answersListItem}>
        <Typography variant="h6">
            {questionListItem.question}
        </Typography>
        <Typography variant="body2">
            {questionListItem.answer}
        </Typography>
    </div>
);

const renderRadioAnswer = (questionListItem, classes) => {
    const answerValue = questionListItem
        .answerOptions
        .find((item) => item.id === questionListItem.answer)
        .value;

    return (
        <div key={questionListItem.id} className={classes.answersListItem}>
            <Typography variant="h6">
                {questionListItem.question}
            </Typography>
            <Typography variant="body1">
                {answerValue}
            </Typography>
        </div>
    );
};

const renderCheckboxAnswer = (questionListItem, classes) => {
    const answerValues = questionListItem
        .answerOptions
        .filter((item) => questionListItem.answer.indexOf(item.id) > -1);

    return (
        <div key={questionListItem.id} className={classes.answersListItem}>
            <Typography variant="h6">
                {questionListItem.question}
            </Typography>
            {answerValues.map((answerValuesItem) => (
                <Typography key={answerValuesItem.id} variant="subtitle1">
                    {answerValuesItem.value}
                </Typography>
            ))}
        </div>
    );
};

const renderSelectAnswer = (questionListItem, classes) => {
    const answerValue = questionListItem
        .answerOptions
        .find((item) => item.id === questionListItem.answer)
        .value;

    return (
        <div key={questionListItem.id} className={classes.answersListItem}>
            <Typography variant="h6">
                {questionListItem.question}
            </Typography>
            <Typography variant="body1">
                {answerValue}
            </Typography>
        </div>
    );
};

export {
    renderStringAnswer,
    renderRadioAnswer,
    renderCheckboxAnswer,
    renderSelectAnswer,
};
