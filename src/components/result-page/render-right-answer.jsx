import React from "react";
import { Typography } from "@material-ui/core";

const renderStringAnswer = ({ id, question, answer }, classes) => (
    <div key={id} className={classes.answersListItem}>
        <Typography variant="h6">
            {question}
        </Typography>
        <Typography variant="body2">
            {answer}
        </Typography>
    </div>
);

const renderRadioAnswer = ({ id, question, answer }, classes) => (
    <div key={id} className={classes.answersListItem}>
        <Typography variant="h6">
            {question}
        </Typography>
        <Typography variant="body1">
            {answer}
        </Typography>
    </div>
);

const renderCheckboxAnswer = ({ id, question, answer }, classes) => (
    <div key={id} className={classes.answersListItem}>
        <Typography variant="h6">
            {question}
        </Typography>
        {answer.map((answerValuesItem) => (
            <Typography key={answerValuesItem} variant="subtitle1">
                {answerValuesItem}
            </Typography>
        ))}
    </div>
);

const renderSelectAnswer = ({ id, question, answer }, classes) => (
    <div key={id} className={classes.answersListItem}>
        <Typography variant="h6">
            {question}
        </Typography>
        <Typography variant="body1">
            {answer}
        </Typography>
    </div>
);

export {
    renderStringAnswer,
    renderRadioAnswer,
    renderCheckboxAnswer,
    renderSelectAnswer,
};
