const questionsRequest = () => ({
    type: "FETCH_QUESTIONS_REQUEST",
});

const questionsLoad = (questions) => ({
    type: "FETCH_QUESTIONS_SUCCESS",
    payload: questions,
});

const questionsError = (error) => ({
    type: "FETCH_QUESTIONS_FAILURE",
    payload: error,
});

const initAnswersList = (questions) => ({
    type: "INIT_ANSWERS_LIST",
    payload: questions,
});

const updateAnswersList = (questionId, value, answerType = "single") => ({
    type: "UPDATE_ANSWERS_LIST",
    payload: {
        questionId,
        value,
        answerType,
    },
});

const getAnswersList = () => ({
    type: "GET_ANSWERS_LIST",
});

const clearInputs = () => ({
    type: "CLEAR_INPUTS",
});

const countResults = () => ({
    type: "COUNT_RESULTS",
});

const fetchQuestions = (testService) => () => (dispatch) => {
    dispatch(questionsRequest());
    testService.getQuestionsList()
        .then((data) => {
            const answersListTemplate = data.map((item) => ({
                id: item.id,
                answer: "",
            }));
            dispatch(initAnswersList(answersListTemplate));
            dispatch(questionsLoad(data));
        })
        .catch((error) => questionsError(error));
};

export {
    questionsRequest,
    questionsLoad,
    questionsError,
    fetchQuestions,
    updateAnswersList,
    getAnswersList,
    clearInputs,
    countResults,
};
