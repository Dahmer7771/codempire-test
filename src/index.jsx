import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/app";
import { TestServiceProvider } from "./components/test-service-context/test-service-context";
import TestService from "./services/testService";
import store from "./store";

const testService = new TestService();

ReactDOM.render(
    <Provider store={store}>
        <TestServiceProvider value={testService}>
            <App />
        </TestServiceProvider>
    </Provider>,
    document.getElementById("root"),
);
