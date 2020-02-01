import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./questions-list.scss";
import {
    Container,
    Button,
    Typography,
    makeStyles,
} from "@material-ui/core";
import {
    useHistory,
} from "react-router-dom";
import withTestService from "../hoc/with-test-service";
import QuestionsListItem from "../questions-list-item/questions-list-item";
import {
    fetchQuestions as fetchQuestionsAction,
    allowShowAnswers as allowShowAnswersAction,
    openModalWindow as openModalWindowAction,
    closeModalWindow as closeModalWindowAction,
    checkIfDataIsEntered as checkIfDataIsEnteredAction,
} from "../../actions";
import Spinner from "../spinner";
import ModalWindow from "../modal-window";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "block",
        margin: "0 auto",
        marginBottom: theme.spacing(2),
    },
    title: {
        marginTop: theme.spacing(2),
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    linkWrapper: {
        display: "flex",
        justifyContent: "center",
    },
}));

const renderQuestionsListItems = (questions, answers) => questions.map((item) => {
    const { id } = item;
    const questionAnswer = answers.find((answer) => answer.id === id);
    return <QuestionsListItem key={id} questionAnswer={questionAnswer} {...item} />;
});

const showResultPage = (
    isTestDone,
    allowShowAnswers,
    history,
    openModalWindow,
    isFieldsFilled,
    checkIfDataIsEntered,
) => {
    checkIfDataIsEntered();
    if (isFieldsFilled) {
        allowShowAnswers(true);
        history.push("/result");
    } else {
        openModalWindow();
    }
};

const QuestionsList = ({
    fetchQuestions,
    questions,
    answers,
    loading,
    error,
    isTestDone,
    allowShowAnswers,
    openModalWindow,
    closeModalWindow,
    isModalWindowOpen,
    isFieldsFilled,
    checkIfDataIsEntered,
}) => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        fetchQuestions();
        allowShowAnswers(false);
    }, [fetchQuestions, allowShowAnswers]);

    if (loading) return <Spinner />;

    if (error) return <div>Error</div>;

    return (
        <Container maxWidth="md">
            <Typography className={classes.title} variant="h4" component="h6">
                Дайте ответы на вопросы
            </Typography>
            <form className="questions">
                {renderQuestionsListItems(questions, answers)}
                <ModalWindow
                    isModalWindowOpen={isModalWindowOpen}
                    allowShowAnswers={allowShowAnswers}
                    closeModalWindow={closeModalWindow}
                    history={history}
                />
                <Button
                    onClick={() => showResultPage(
                        isTestDone,
                        allowShowAnswers,
                        history,
                        openModalWindow,
                        isFieldsFilled,
                        checkIfDataIsEntered,
                    )}
                    className={classes.root}
                    variant="contained"
                    color="primary"
                >
                    Завершить
                </Button>
            </form>
        </Container>
    );
};

const mapStateToProps = ({
    isTestDone,
    questionsList: { questions, loading, error },
    answersList: { answers, correctAnswers },
    isModalWindowOpen,
    isFieldsFilled,
}) => ({
    isTestDone,
    questions,
    answers,
    correctAnswers,
    loading,
    error,
    isModalWindowOpen,
    isFieldsFilled,
});

const mapDispatchToProps = (dispatch, { testService }) => bindActionCreators({
    fetchQuestions: fetchQuestionsAction(testService),
    allowShowAnswers: allowShowAnswersAction,
    openModalWindow: openModalWindowAction,
    closeModalWindow: closeModalWindowAction,
    checkIfDataIsEntered: checkIfDataIsEnteredAction,
}, dispatch);

export default withTestService()(
    connect(mapStateToProps, mapDispatchToProps)(QuestionsList),
);
