const checkIfDataIsEntered = ({ questionsWithUserAnswer }) => {
    if (questionsWithUserAnswer.length === 0) return false;

    const emptyFields = questionsWithUserAnswer.some(({ userAnswer }) => {
        if (Array.isArray(userAnswer)) return userAnswer.length === 0;
        return userAnswer === "";
    });

    return !emptyFields;
};

const updateAnswersList = (state, action) => {
    const { questionsWithUserAnswer } = state;

    const {
        questionId,
        value,
    } = action.payload;

    const question = questionsWithUserAnswer.find(({ id }) => id === questionId);
    const index = questionsWithUserAnswer.indexOf(question);
    let newValue = value;

    if (Array.isArray(question.answer)) {
        const currentAnswerIndex = question.userAnswer.indexOf(value);

        if (currentAnswerIndex > -1) {
            newValue = [
                ...question.userAnswer.slice(0, currentAnswerIndex),
                ...question.userAnswer.slice(currentAnswerIndex + 1),
            ];
        } else {
            newValue = [
                ...question.userAnswer,
                value,
            ];
        }
    }

    const questionsList = [
        ...state.questionsWithUserAnswer.slice(0, index),
        {
            ...state.questionsWithUserAnswer[index],
            userAnswer: newValue,
        },
        ...state.questionsWithUserAnswer.slice(index + 1),
    ];

    const sessionUserAnswers = questionsList.map(({ id, userAnswer }) => ({
        id,
        userAnswer,
    }));

    sessionStorage.setItem("CODEMPIRE_USER_ANSWERS", JSON.stringify(sessionUserAnswers));

    return questionsList;
};

const compareAnswers = (type, rightAnswer, userAnswer) => {
    if (userAnswer === "" || userAnswer === []) return false;

    switch (type) {
    case "string":
        return rightAnswer.toLowerCase() === userAnswer.toLowerCase();
    case "radio":
    case "select":
        return rightAnswer === userAnswer;
    case "checkbox":
        if (rightAnswer.length !== userAnswer.length) return false;
        return rightAnswer.every((answersItem) => userAnswer.includes(answersItem));
    default:
        return false;
    }
};

const countResults = ({ questionsWithUserAnswer }) => {
    const rightAnswers = questionsWithUserAnswer
        .filter(({ type, answer, userAnswer }) => compareAnswers(type, answer, userAnswer));

    return rightAnswers.length;
};

const clearInputs = ({ questionsWithUserAnswer }) => {
    const clearedUserAnswers = questionsWithUserAnswer.map((answersListItem) => ({
        ...answersListItem,
        userAnswer: "",
    }));

    const userAnswers = questionsWithUserAnswer.map(({ id, userAnswer }) => ({
        id,
        userAnswer,
    }));

    sessionStorage.setItem("CODEMPIRE_USER_ANSWERS", JSON.stringify(userAnswers));

    return clearedUserAnswers;
};

const initialState = {
    questionsWithUserAnswer: [],
    questionsLoading: true,
    questionsError: false,
    isModalWindowOpen: false,
    isTestDone: false,
    isFieldsFilled: false,
    correctAnswers: 0,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case "FETCH_QUESTIONS_REQUEST":
        return {
            ...state,
            loading: true,
            error: false,
        };
    case "FETCH_QUESTIONS_SUCCESS":
        return {
            ...state,
            questionsWithUserAnswer: action.payload,
            loading: false,
            error: false,
        };
    case "FETCH_QUESTIONS_FAILURE":
        return {
            ...state,
            loading: false,
            error: true,
        };
    case "UPDATE_ANSWERS_LIST":
        return {
            ...state,
            questionsWithUserAnswer: updateAnswersList(state, action),
        };
    case "CLEAR_INPUTS":
        return {
            ...state,
            questionsWithUserAnswer: clearInputs(state),
        };
    case "COUNT_RESULTS":
        return {
            ...state,
            correctAnswers: countResults(state),
        };
    case "CHECK_IF_DATA_IS_ENTERED":
        return {
            ...state,
            isFieldsFilled: checkIfDataIsEntered(state),
        };
    case "OPEN_MODAL_WINDOW":
        return {
            ...state,
            isModalWindowOpen: true,
        };
    case "CLOSE_MODAL_WINDOW":
        return {
            ...state,
            isModalWindowOpen: false,
        };
    case "ALLOW_SHOW_ANSWERS":
        return {
            ...state,
            isTestDone: action.payload,
        };
    default:
        return state;
    }
};

export default rootReducer;
