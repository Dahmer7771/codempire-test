import React from "react";
import "./app.scss";
import { connect } from "react-redux";
import {
    Switch,
    Route,
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppHeader from "../app-header";
import QuestionsList from "../questions-list";
import ResultPage from "../result-page";
import { changeCurrentPage as changeCurrentPageAction } from "../../actions";

const App = ({ changeCurrentPage }) => (
    <div className="app">
        <AppHeader />
        <Switch>
            <Route exact path="/" component={QuestionsList} />
            <Route path="/result" component={ResultPage} />
        </Switch>
        <Button onClick={() => changeCurrentPage("/result")}>Result</Button>
    </div>
);

const mapStateToProps = ({ currentPage }) => ({
    currentPage,
});

const mapDispatchToProps = {
    changeCurrentPage: changeCurrentPageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
