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
    { id, question, userAnswer },
    updateAnswersList,
    classes,
    checkIfDataIsEntered,
) => (
    <div className="questions-list-item">
        <FormControl className={classes.formControl} fullWidth variant="outlined">
            <FormLabel className={classes.formLabel} component="legend">{question}</FormLabel>
            <OutlinedInput
                value={userAnswer || ""}
                name={`question-${id}`}
                onChange={(e) => {
                    updateAnswersList(id, e.target.value);
                    checkIfDataIsEntered();
                }}
            />
        </FormControl>
    </div>
);

const createRadioQuestion = (
    {
        id, question, answerOptions, userAnswer,
    },
    updateAnswersList,
    classes,
    checkIfDataIsEntered,
) => (
    <div className="questions-list-item">
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel className={classes.formLabel} component="legend">{question}</FormLabel>
            <RadioGroup
                aria-label="gender"
                name={`question-${id}`}
                value={userAnswer || ""}
                onChange={(e) => {
                    updateAnswersList(id, e.target.value);
                    checkIfDataIsEntered();
                }}
            >
                {answerOptions.map((option) => (
                    <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio color="primary" />}
                        label={option}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    </div>
);

const createCheckboxQuestion = (
    {
        id, question, answerOptions, userAnswer,
    },
    updateAnswersList,
    classes,
    checkIfDataIsEntered,
) => (
    <div className="questions-list-item">
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel className={classes.formLabel} component="legend">{question}</FormLabel>
            <FormGroup>
                {answerOptions.map((option) => (
                    <FormControlLabel
                        key={option}
                        control={(
                            <Checkbox
                                checked={
                                    userAnswer.includes(option)
                                }
                                color="primary"
                                onChange={(e) => {
                                    updateAnswersList(id, e.target.value);
                                    checkIfDataIsEntered();
                                }}
                                value={option}
                            />
                        )}
                        label={option}
                    />
                ))}
            </FormGroup>
            <FormHelperText>Правильных ответов несколько</FormHelperText>
        </FormControl>
    </div>
);

const createSelectQuestion = (
    {
        id, question, answerOptions, userAnswer,
    },
    updateAnswersList,
    classes,
    checkIfDataIsEntered,
) => (
    <div className="questions-list-item">
        <FormControl variant="outlined" className={classes.formControl}>
            <FormLabel className={classes.formLabel} component="legend">{question}</FormLabel>
            <Select
                native
                value={userAnswer || ""}
                name={`question-${id}`}
                onChange={(e) => {
                    updateAnswersList(id, e.target.value);
                    checkIfDataIsEntered();
                }}
            >
                <option disabled value="">
                        Select
                </option>
                {answerOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
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
