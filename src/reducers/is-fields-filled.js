const checkIfDataIsEntered = (state) => {
    if (state.answersList.answers.length === 0) return false;
    const emptyFields = state.answersList.answers.filter((item) => {
        if (Array.isArray(item.answer) && item.answer.length === 0) return true;
        if (item.answer === "") return true;
        return false;
    });
    return !emptyFields.length;
};
const isFieldsFilled = (state, action) => {
    if (state === undefined) {
        return false;
    }

    switch (action.type) {
    case "CHECK_IF_DATA_IS_ENTERED":
        return checkIfDataIsEntered(state);
    default:
        return state.isFieldsFilled;
    }
};

export default isFieldsFilled;
