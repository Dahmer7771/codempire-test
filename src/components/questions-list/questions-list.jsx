import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./questions-list.scss";
import {
    Container,
    Button,
    Modal,
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
    getAnswersList as getAnswersListAction,
} from "../../actions";
import Spinner from "../spinner";

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
    paper: {
        position: "absolute",
        maxWidth: 400,
        width: "90%",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        margin: theme.spacing(0, 1),
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
    getAnswersList,
    isFieldsFilled,
) => {
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
    getAnswersList,
    isFieldsFilled,
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
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={isModalWindowOpen}
                    onClose={() => closeModalWindow()}
                >
                    <div className={classes.paper}>
                        <h2 id="simple-modal-title">Предупреждение</h2>
                        <p id="simple-modal-description">
                            Каждый не отвеченный ответ считается неправильным.
                            Вы уверены что хотите продолжить?
                        </p>
                        <div className={classes.buttonsContainer}>
                            <Button
                                className={classes.button}
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    closeModalWindow();
                                    allowShowAnswers(true);
                                    history.push("/result");
                                }}
                            >
                                Да
                            </Button>
                            <Button
                                className={classes.button}
                                variant="outlined"
                                color="secondary"
                                onClick={closeModalWindow}
                            >
                                Отмена
                            </Button>
                        </div>
                    </div>
                </Modal>
                <Button
                    onClick={() => showResultPage(
                        isTestDone,
                        allowShowAnswers,
                        history,
                        openModalWindow,
                        getAnswersList,
                        isFieldsFilled,
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
    getAnswersList: getAnswersListAction,
}, dispatch);

export default withTestService()(
    connect(mapStateToProps, mapDispatchToProps)(QuestionsList),
);
