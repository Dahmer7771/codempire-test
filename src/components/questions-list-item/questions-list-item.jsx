import { connect } from "react-redux";
import {
    makeStyles,
} from "@material-ui/core";
import { updateAnswersList as updateAnswersListAction } from "../../actions";
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
) => {
    switch (type) {
    case "string":
        return createStringQuestion(questionInfo, questionAnswer, updateAnswersList, classes);
    case "radio":
        return createRadioQuestion(questionInfo, questionAnswer, updateAnswersList, classes);
    case "checkbox":
        return createCheckboxQuestion(questionInfo, questionAnswer, updateAnswersList, classes);
    case "select":
        return createSelectQuestion(questionInfo, questionAnswer, updateAnswersList, classes);
    default:
        return null;
    }
};

const QuestionsListItem = (props) => {
    const {
        type,
        questionAnswer,
        updateAnswersList,
        ...questionInfo
    } = props;
    const classes = useStyles();

    return createQuestionOfGivenType(
        type,
        questionInfo,
        questionAnswer,
        updateAnswersList,
        classes,
    );
};

// const mapStateToProps = () => ({
//
// });

const mapDispatchToProps = {
    updateAnswersList: updateAnswersListAction,
};

export default connect(null, mapDispatchToProps)(QuestionsListItem);
