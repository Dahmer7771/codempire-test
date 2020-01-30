import React from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";

const ResultPage = ({ answers }) => (
    <Container maxWidth="md">
        <ul>
            {answers.map((item) => (
                <li>
                    <span>{item.id}</span>
                    <br />
                    <span>{item.answer}</span>
                </li>
            ))}
        </ul>
    </Container>
);

const mapStateToProps = ({ answersList: { answers } }) => ({
    answers,
});

// const mapDispatchToProps = {
//
// };

export default connect(mapStateToProps, null)(ResultPage);
