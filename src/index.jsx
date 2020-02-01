import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
    BrowserRouter,
} from "react-router-dom";
import App from "./components/app";
import { TestServiceProvider } from "./components/test-service-context/test-service-context";
import TestServiceServer from "./services/testServiceServer";
import store from "./store";

const testService = new TestServiceServer();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <TestServiceProvider value={testService}>
                <App />
            </TestServiceProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root"),
);
