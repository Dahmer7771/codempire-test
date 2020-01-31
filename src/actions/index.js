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

const clearInputs = () => ({
    type: "CLEAR_INPUTS",
});

const countResults = () => ({
    type: "COUNT_RESULTS",
});

const checkIfDataIsEntered = () => ({
    type: "CHECK_IF_DATA_IS_ENTERED",
});

const openModalWindow = () => ({
    type: "OPEN_MODAL_WINDOW",
});

const closeModalWindow = () => ({
    type: "CLOSE_MODAL_WINDOW",
});

const fetchQuestions = (testService) => () => (dispatch) => {
    dispatch(questionsRequest());
    testService.getQuestionsList()
        .then((data) => {
            const answersListTemplate = JSON.parse(sessionStorage.getItem("CODEMPIRE_USER_ANSWERS")) || data.map((item) => ({
                id: item.id,
                answer: "",
            }));
            sessionStorage.setItem("CODEMPIRE_USER_ANSWERS", JSON.stringify(answersListTemplate));
            dispatch(initAnswersList(answersListTemplate));
            dispatch(questionsLoad(data));
        })
        .catch((error) => questionsError(error));
};

const allowShowAnswers = (page) => ({
    type: "ALLOW_SHOW_ANSWERS",
    payload: page,
});

export {
    questionsRequest,
    questionsLoad,
    questionsError,
    fetchQuestions,
    updateAnswersList,
    clearInputs,
    countResults,
    allowShowAnswers,
    checkIfDataIsEntered,
    openModalWindow,
    closeModalWindow,
};
