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
    rest,
    classes,
) => {
    switch (type) {
    case "string":
        return createStringQuestion(rest, classes);
    case "radio":
        return createRadioQuestion(rest, classes);
    case "checkbox":
        return createCheckboxQuestion(rest, classes);
    case "select":
        return createSelectQuestion(rest, classes);
    default:
        return null;
    }
};

const QuestionsListItem = ({ type, ...rest }) => {
    const classes = useStyles();
    return createQuestionOfGivenType(
        type,
        rest,
        classes,
    );
};

const mapDispatchToProps = {
    updateAnswersList: updateAnswersListAction,
    checkIfDataIsEntered: checkIfDataIsEnteredAction,
};

export default connect(null, mapDispatchToProps)(QuestionsListItem);
