import questionsList from "./questions-list";
import answersList from "./answers-list";

const rootReducer = (state, action) => ({
    questionsList: questionsList(state, action),
    answersList: answersList(state, action),
});

export default rootReducer;
