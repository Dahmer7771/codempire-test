import React from "react";
import "./app.scss";
import AppHeader from "../app-header";
import QuestionsList from "../questions-list";

const App = () => (
    <div className="app">
        <AppHeader />
        <QuestionsList />
    </div>
);

export default App;
