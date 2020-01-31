import questionsList from "./questions-list";
import answersList from "./answers-list";
import isTestDone from "./is-test-done";
import isFieldsFilled from "./is-fields-filled";
import switchModalWindow from "./switch-modal-window";

const rootReducer = (state, action) => ({
    isTestDone: isTestDone(state, action),
    questionsList: questionsList(state, action),
    answersList: answersList(state, action),
    isFieldsFilled: isFieldsFilled(state, action),
    isModalWindowOpen: switchModalWindow(state, action),
});

export default rootReducer;
