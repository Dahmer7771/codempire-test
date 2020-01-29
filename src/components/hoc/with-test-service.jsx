import React from "react";
import { TestServiceConsumer } from "../test-service-context/test-service-context";

const withTestService = () => (Wrapped) => (props) => (
    <TestServiceConsumer>
        {
            (testService) => (
                <Wrapped {...props} testService={testService} />
            )
        }
    </TestServiceConsumer>
);

export default withTestService;
