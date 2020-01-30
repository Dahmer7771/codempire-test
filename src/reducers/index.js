import questionsList from "./questions-list";
import answersList from "./answers-list";
import currentPage from "./currentPage";

const rootReducer = (state, action) => ({
    currentPage: currentPage(state, action),
    questionsList: questionsList(state, action),
    answersList: answersList(state, action),
});

export default rootReducer;
