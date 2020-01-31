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

    const answers = [
        ...state.answersList.answers.slice(0, idx),
        {
            id: questionId,
            answer: newValue,
        },
        ...state.answersList.answers.slice(idx + 1),
    ];

    sessionStorage.setItem("CODEMPIRE_USER_ANSWERS", JSON.stringify(answers));

    return answers;
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
    const { answers } = state.answersList;
    const questions = state.questionsList.questions.map((item) => ({
        id: item.id,
        question: item.question,
        answer: item.answer,
        type: item.type,
    }));
    const results = [];

    questions.forEach((questionsItem) => {
        const currentAnswer = answers.find((answersItem) => answersItem.id === questionsItem.id);
        const isEquals = compareAnswers(
            questionsItem.type,
            questionsItem.answer,
            currentAnswer.answer,
        );
        results.push({
            id: questionsItem.id,
            question: questionsItem.question,
            userAnswer: currentAnswer.answer,
            isRight: isEquals,
        });
    });

    const correctAnswersCount = results.filter((item) => item.isRight).length;

    return {
        ...state.answersList,
        correctAnswers: correctAnswersCount,
    };
};

const clearInputs = (state) => {
    const answersCopy = state.answersList.answers.map((answersListItem) => ({
        id: answersListItem.id,
        answer: "",
    }));
    sessionStorage.setItem("CODEMPIRE_USER_ANSWERS", JSON.stringify(answersCopy));
    return {
        ...state.answersList,
        answers: answersCopy,
    };
};

const answersList = (state, action) => {
    if (state === undefined) {
        return {
            answers: [],
            correctAnswers: 0,
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
    case "CLEAR_INPUTS":
        return clearInputs(state);
    case "COUNT_RESULTS":
        return countResults(state);
    default:
        return state.answersList;
    }
};

export default answersList;
