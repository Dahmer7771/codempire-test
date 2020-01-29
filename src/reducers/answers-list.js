const updateAnswersList = (state, action) => {
    const {
        questionId,
        value,
        answerType,
    } = action.payload;
    const currentAnswer = state.answersList.answers.find(({ id }) => id === questionId);
    const idx = state.answersList.answers.indexOf(currentAnswer);
    let newValue = value;

    if (answerType === "multi") {
        const currentAnswerIndex = currentAnswer.answer.indexOf(value);
        if (currentAnswerIndex > -1) {
            newValue = [
                ...currentAnswer.answer.slice(0, currentAnswerIndex),
                ...currentAnswer.answer.slice(currentAnswerIndex + 1),
            ];
        } else {
            newValue = [
                ...currentAnswer.answer,
                value,
            ];
        }
    }

    return [
        ...state.answersList.answers.slice(0, idx),
        {
            id: questionId,
            answer: newValue,
        },
        ...state.answersList.answers.slice(idx + 1),
    ];
};

const getAnswersList = (state) => {
    console.log(state);
    return state.answersList;
};

const answersList = (state, action) => {
    if (state === undefined) {
        return {
            answers: [],
        };
    }

    switch (action.type) {
    case "INIT_ANSWERS_LIST":
        return {
            ...state.answersList,
            answers: action.payload,
        };
    case "UPDATE_ANSWERS_LIST":
        return {
            ...state.answersList,
            answers: updateAnswersList(state, action),
        };
    case "GET_ANSWERS_LIST":
        return getAnswersList(state);
    default:
        return state.answersList;
    }
};

export default answersList;
