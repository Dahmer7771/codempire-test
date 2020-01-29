import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./questions-list.scss";
import { Container } from "@material-ui/core";
import { bindActionCreators } from "redux";
import withTestService from "../hoc/with-test-service";
import QuestionsListItem from "../questions-list-item/questions-list-item";
import { fetchQuestions as fetchQuestionsAction } from "../../actions";

const renderQuestionsListItems = (questions, answers) => questions.map((item) => {
    const { id } = item;
    const questionAnswer = answers.find((answer) => answer.id === id);
    return <QuestionsListItem key={id} questionAnswer={questionAnswer} {...item} />;
});

const QuestionsList = ({
    fetchQuestions, questions, answers, loading, error,
}) => {
    useEffect(() => {
        fetchQuestions();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error</div>;

    return (
        <Container maxWidth="md">
            <form className="questions">
                {renderQuestionsListItems(questions, answers)}
            </form>
        </Container>
    );
};

const mapStateToProps = ({
    questionsList: { questions, loading, error },
    answersList: { answers },
}) => ({
    questions,
    answers,
    loading,
    error,
});

const mapDispatchToProps = (dispatch, { testService }) => bindActionCreators({
    fetchQuestions: fetchQuestionsAction(testService),
}, dispatch);

export default withTestService()(
    connect(mapStateToProps, mapDispatchToProps)(QuestionsList),
);
