import React from "react";
import "./app.scss";
import {
    Switch,
    Route,
} from "react-router-dom";
import AppHeader from "../app-header";
import QuestionsList from "../questions-list";
import ResultPage from "../result-page";

const App = () => (
    <div className="app">
        <AppHeader />
        <Switch>
            <Route exact path="/" component={QuestionsList} />
            <Route path="/result" component={ResultPage} />
        </Switch>
    </div>
);

export default App;
