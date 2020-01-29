const updateAnswersList = (state, action) => {
    const {
        questionId,
        value,
    } = action.payload;
    const answer = state.answersList.answers.find(({ id }) => id === questionId);
    const idx = state.answersList.answers.indexOf(answer);

    return [
        ...state.answersList.answers.slice(0, idx),
        {
            id: questionId,
            answer: value,
        },
        ...state.answersList.answers.slice(idx + 1),
    ];
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
    default:
        return state.answersList;
    }
};

export default answersList;
