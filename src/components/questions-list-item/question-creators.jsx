import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
} from "@material-ui/core";
import React from "react";

const createStringQuestion = ({ id, question }, questionAnswer, updateAnswersList, classes) => {
    console.log(questionAnswer);
    return (
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
};

const createRadioQuestion = (
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
                <RadioGroup
                    aria-label="gender"
                    name={`question-${id}`}
                    value={questionAnswer ? questionAnswer.answer : ""}
                    onChange={(e) => {
                        updateAnswersList(id, e.target.value);
                    }}
                >
                    {answerOptions.map((option) => (
                        <FormControlLabel
                            key={option.id}
                            value={option.value}
                            control={<Radio color="primary" />}
                            label={option.value}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

const createCheckboxQuestion = ({ id, question }, questionAnswer, updateAnswersList, classes) => (
    <div className="questions-list-item">
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel className={classes.formLabel} component="legend">{question}</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox checked onChange={() => console.log("check 1")} value="gilad" />
                    }
                    label="Gilad Gray"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked onChange={() => console.log("check 2")} value="jason" />
                    }
                    label="Jason Killian"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={false} onChange={() => console.log("check 3")} value="antoine" />
                    }
                    label="Antoine Llorca"
                />
            </FormGroup>
            <FormHelperText>Правильных ответов несколько</FormHelperText>
        </FormControl>
    </div>
);

const createSelectQuestion = (rest, questionAnswer, updateAnswersList, classes) => (
    <div className="questions-list-item">
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
                Age
            </InputLabel>
            <Select
                native
                value="AGGI"
                onChange={() => console.log("123")}
                labelWidth={40}
                inputProps={{
                    name: "age",
                    id: "outlined-age-native-simple",
                }}
            >
                <option disabled value="">
                    Select
                </option>
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
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
