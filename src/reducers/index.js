import questionsList from "./questions-list";
import answersList from "./answers-list";
import showResult from "./showResult";

const rootReducer = (state, action) => ({
    isTestDone: showResult(state, action),
    questionsList: questionsList(state, action),
    answersList: answersList(state, action),
});

export default rootReducer;
