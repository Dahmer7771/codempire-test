import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { countResults as countResultsAction } from "../../actions";

const ResultPage = ({
    answers,
    correctAnswers,
    countResults,
    isTestDone,
}) => {
    useEffect(() => {
        if (!isTestDone) return <Redirect to="/" />;
        countResults();
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h5">
                Ответы
            </Typography>
            <Typography variant="subtitle1">
                {`Вы ответили правильно на ${correctAnswers} вопросов из ${answers.length}`}
            </Typography>
        </Container>
    );
};

const mapStateToProps = ({ answersList: { answers, correctAnswers }, isTestDone }) => ({
    answers,
    correctAnswers,
    isTestDone,
});

const mapDispatchToProps = {
    countResults: countResultsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
