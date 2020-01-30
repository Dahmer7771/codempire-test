import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
} from "@material-ui/core";
import React from "react";

const createStringQuestion = (
    { id, question },
    questionAnswer,
    updateAnswersList,
    classes,
) => (
    <div className="questions-list-item">
        <FormControl className={classes.formControl} fullWidth variant="outlined">
            <FormLabel className={classes.formLabel} component="legend">{question}</FormLabel>
            <OutlinedInput
                value={questionAnswer ? questionAnswer.answer : ""}
                name={`question-${id}`}
                onChange={(e) => {
                    updateAnswersList(id, e.target.value);
                }}
            />
        </FormControl>
    </div>
);

const createRadioQuestion = (
    { id, question, answerOptions },
    questionAnswer,
    updateAnswersList,
    classes,
) => (
    <div className="questions-list-item">
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel className={classes.formLabel} component="legend">{question}</FormLabel>
            <RadioGroup
                aria-label="gender"
                name={`question-${id}`}
                value={questionAnswer ? parseInt(questionAnswer.answer, 10) : ""}
                onChange={(e) => {
                    updateAnswersList(id, e.target.value);
                }}
            >
                {answerOptions.map((option) => (
                    <FormControlLabel
                        key={option.id}
                        value={option.id}
                        control={<Radio color="primary" />}
                        label={option.value}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    </div>
);

const createCheckboxQuestion = (
    { id, question, answerOptions },
    questionAnswer,
    updateAnswersList,
    classes,
) => {
    console.log(questionAnswer);
    return (
        <div className="questions-list-item">
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel className={classes.formLabel} component="legend">{question}</FormLabel>
                <FormGroup>
                    {answerOptions.map((option) => (
                        <FormControlLabel
                            key={option.id}
                            control={(
                                <Checkbox
                                    checked={
                                        questionAnswer.answer.indexOf(option.id.toString()) > -1
                                    }
                                    color="primary"
                                    onChange={(e) => updateAnswersList(id, e.target.value, "multi")}
                                    value={option.id}
                                />
                            )}
                            label={option.value}
                        />
                    ))}
                </FormGroup>
                <FormHelperText>Правильных ответов несколько</FormHelperText>
            </FormControl>
        </div>
    );
};

const createSelectQuestion = (
    { id, question, answerOptions },
    questionAnswer,
    updateAnswersList,
    classes,
) => (
    <div className="questions-list-item">
        <FormControl variant="outlined" className={classes.formControl}>
            <FormLabel className={classes.formLabel} component="legend">{question}</FormLabel>
            <Select
                native
                value={questionAnswer ? questionAnswer.answer : ""}
                name={`question-${id}`}
                onChange={(e) => {
                    updateAnswersList(id, e.target.value);
                }}
            >
                <option disabled value="">
                        Select
                </option>
                {answerOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.value}
                    </option>
                ))}
            </Select>
        </FormControl>
    </div>
);

export {
    createSelectQuestion,
    createCheckboxQuestion,
    createRadioQuestion,
    createStringQuestion,
};
