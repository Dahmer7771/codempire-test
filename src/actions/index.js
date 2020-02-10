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
            let questionsWithUserAnswers;
            if (sessionStorage.CODEMPIRE_USER_ANSWERS) {
                const sessionData = JSON.parse(sessionStorage.getItem("CODEMPIRE_USER_ANSWERS"));

                questionsWithUserAnswers = data.map((item) => ({
                    ...item,
                    userAnswer: sessionData.find(({ id }) => id === item.id).userAnswer,
                }));
            } else {
                questionsWithUserAnswers = data.map((item) => ({
                    ...item,
                    userAnswer: "",
                }));

                const userAnswers = questionsWithUserAnswers.map(({ id, userAnswer }) => ({
                    id,
                    userAnswer,
                }));

                sessionStorage.setItem("CODEMPIRE_USER_ANSWERS", JSON.stringify(userAnswers));
            }

            dispatch(questionsLoad(questionsWithUserAnswers));
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
