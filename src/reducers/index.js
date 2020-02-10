const checkIfDataIsEntered = ({ questionsWithUserAnswer }) => {
    if (questionsWithUserAnswer.length === 0) return false;
    const emptyFields = questionsWithUserAnswer.filter(({ userAnswer }) => {
        if (Array.isArray(userAnswer) && userAnswer.length === 0) return true;
        return userAnswer === "";
    });
    return !emptyFields.length;
};

const updateAnswersList = (state, action) => {
    console.log("UPDATE");
    const {
        questionId,
        value,
        answerType,
    } = action.payload;
    const currentAnswer = state.questionsWithUserAnswer.find(({ id }) => id === questionId);
    const idx = state.questionsWithUserAnswer.indexOf(currentAnswer);
    let newValue = value;

    if (answerType === "multi") {
        const currentAnswerIndex = currentAnswer.userAnswer.indexOf(value);
        if (currentAnswerIndex > -1) {
            newValue = [
                ...currentAnswer.userAnswer.slice(0, currentAnswerIndex),
                ...currentAnswer.userAnswer.slice(currentAnswerIndex + 1),
            ];
        } else {
            newValue = [
                ...currentAnswer.userAnswer,
                value,
            ];
        }
    }

    const questionsWithUserAnswer = [
        ...state.questionsWithUserAnswer.slice(0, idx),
        {
            ...state.questionsWithUserAnswer[idx],
            userAnswer: newValue,
        },
        ...state.questionsWithUserAnswer.slice(idx + 1),
    ];

    const userAnswers = questionsWithUserAnswer.map(({ id, userAnswer }) => ({
        id,
        userAnswer,
    }));

    sessionStorage.setItem("CODEMPIRE_USER_ANSWERS", JSON.stringify(userAnswers));

    return questionsWithUserAnswer;
};

const compareAnswers = (type, rightAnswer, userAnswer) => {
    if (userAnswer === "" || userAnswer === []) return false;

    switch (type) {
    case "string":
        return rightAnswer.toLowerCase() === userAnswer.toLowerCase();
    case "radio":
    case "select":
        return parseInt(rightAnswer, 10) === parseInt(userAnswer, 10);
    case "checkbox":
        if (rightAnswer.length !== userAnswer.length) return false;

        let isRight = true;
        rightAnswer.forEach((answersItem) => {
            if (userAnswer.indexOf(answersItem.toString()) === -1) isRight = false;
        });

        return isRight;
    default:
        return false;
    }
};

const countResults = (state) => {
    let correctAnswersCount = 0;
    state.questionsWithUserAnswer.forEach(({ type, answer, userAnswer }) => {
        const isEqual = compareAnswers(type, answer, userAnswer);
        if (isEqual) correctAnswersCount++;
    });

    return correctAnswersCount;
};

const clearInputs = (state) => {
    const clearedUserAnswers = state.questionsWithUserAnswer.map((answersListItem) => ({
        ...answersListItem,
        userAnswer: "",
    }));

    const userAnswers = state.questionsWithUserAnswer.map(({ id, userAnswer }) => ({
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
