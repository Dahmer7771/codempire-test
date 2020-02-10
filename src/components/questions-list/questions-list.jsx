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
import { useHistory } from "react-router-dom";
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

const renderQuestionsListItems = (questionsList) => questionsList.map((item) => {
    const { id } = item;
    return <QuestionsListItem key={id} {...item} />;
});

const showResultPage = (
    allowShowAnswers,
    history,
    openModalWindow,
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
    questionsWithUserAnswer,
    loading,
    error,
    allowShowAnswers,
    openModalWindow,
    closeModalWindow,
    isModalWindowOpen,
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
                {renderQuestionsListItems(questionsWithUserAnswer)}
                <ModalWindow
                    isModalWindowOpen={isModalWindowOpen}
                    allowShowAnswers={allowShowAnswers}
                    closeModalWindow={closeModalWindow}
                    history={history}
                />
                <Button
                    onClick={() => showResultPage(
                        allowShowAnswers,
                        history,
                        openModalWindow,
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
    questionsWithUserAnswer,
    loading,
    error,
    isModalWindowOpen,
    isFieldsFilled,
}) => ({
    isTestDone,
    questionsWithUserAnswer,
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
