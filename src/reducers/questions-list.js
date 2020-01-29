const questionsList = (state, action) => {
    if (state === undefined) {
        return {
            questions: [],
            loading: true,
            error: false,
        };
    }

    switch (action.type) {
    case "FETCH_QUESTIONS_REQUEST":
        return {
            ...state.questionsList,
            loading: true,
            error: false,
        };
    case "FETCH_QUESTIONS_SUCCESS":
        return {
            ...state.questionsList,
            questions: action.payload,
            loading: false,
            error: false,
        };
    case "FETCH_QUESTIONS_FAILURE":
        return {
            ...state.questionsList,
            loading: false,
            error: true,
        };
    default:
        return state.questionsList;
    }
};

export default questionsList;
