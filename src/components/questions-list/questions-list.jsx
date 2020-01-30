import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./questions-list.scss";
import {
    Container,
    Button,
    makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import withTestService from "../hoc/with-test-service";
import QuestionsListItem from "../questions-list-item/questions-list-item";
import { fetchQuestions as fetchQuestionsAction } from "../../actions";
import Spinner from "../spinner";

const useStyles = makeStyles(() => ({
    root: {
        display: "block",
        margin: "0 auto",
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

const QuestionsList = ({
    fetchQuestions, questions, answers, loading, error,
}) => {
    const classes = useStyles();

    useEffect(() => {
        fetchQuestions();
    }, []);

    if (loading) return <Spinner />;

    if (error) return <div>Error</div>;

    return (
        <Container maxWidth="md">
            <form className="questions">
                {renderQuestionsListItems(questions, answers)}
                <div className={classes.linkWrapper}>
                    <Link to="/result" className={classes.link}>
                        <Button onClick={() => alert("CH")} className={classes.root} variant="contained" color="primary">
                            Завершить
                        </Button>
                    </Link>
                </div>
            </form>
        </Container>
    );
};

const mapStateToProps = ({
    questionsList: { questions, loading, error },
    answersList: { answers, correctAnswers },
}) => ({
    questions,
    answers,
    correctAnswers,
    loading,
    error,
});

const mapDispatchToProps = (dispatch, { testService }) => bindActionCreators({
    fetchQuestions: fetchQuestionsAction(testService),
}, dispatch);

export default withTestService()(
    connect(mapStateToProps, mapDispatchToProps)(QuestionsList),
);
