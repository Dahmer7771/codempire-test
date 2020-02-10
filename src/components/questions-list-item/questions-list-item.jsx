import { connect } from "react-redux";
import {
    makeStyles,
} from "@material-ui/core";
import {
    updateAnswersList as updateAnswersListAction,
    checkIfDataIsEntered as checkIfDataIsEnteredAction,
} from "../../actions";
import {
    createStringQuestion,
    createRadioQuestion,
    createCheckboxQuestion,
    createSelectQuestion,
} from "./question-creators";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2, 0),
        display: "flex",
    },
    formLabel: {
        marginBottom: theme.spacing(1),
    },
}));

const createQuestionOfGivenType = (
    type,
    questionInfo,
    questionAnswer,
    updateAnswersList,
    classes,
    checkIfDataIsEntered,
) => {
    switch (type) {
    case "string":
        return createStringQuestion(
            questionInfo,
            questionAnswer,
            updateAnswersList,
            classes,
            checkIfDataIsEntered,
        );
    case "radio":
        return createRadioQuestion(
            questionInfo,
            questionAnswer,
            updateAnswersList,
            classes,
            checkIfDataIsEntered,
        );
    case "checkbox":
        return createCheckboxQuestion(
            questionInfo,
            questionAnswer,
            updateAnswersList,
            classes,
            checkIfDataIsEntered,
        );
    case "select":
        return createSelectQuestion(
            questionInfo,
            questionAnswer,
            updateAnswersList,
            classes,
            checkIfDataIsEntered,
        );
    default:
        return null;
    }
};

const QuestionsListItem = (props) => {
    const {
        type,
        updateAnswersList,
        checkIfDataIsEntered,
        ...questionInfo
    } = props;
    const classes = useStyles();
    return createQuestionOfGivenType(
        type,
        questionInfo,
        updateAnswersList,
        classes,
        checkIfDataIsEntered,
    );
};

const mapDispatchToProps = {
    updateAnswersList: updateAnswersListAction,
    checkIfDataIsEntered: checkIfDataIsEnteredAction,
};

export default connect(null, mapDispatchToProps)(QuestionsListItem);
