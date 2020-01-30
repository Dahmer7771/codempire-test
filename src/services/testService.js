export default class TestService {
    questionId = 1;

    addStringQuestion = (question, answer) => ({
        id: this.questionId++,
        type: "string",
        question,
        answer,
    });

    addRadioQuestion = (question, answerOptions, answer) => ({
        id: this.questionId++,
        type: "radio",
        question,
        answerOptions,
        answer,
    });

    addCheckboxQuestion = (question, answerOptions, answer) => ({
        id: this.questionId++,
        type: "checkbox",
        question,
        answerOptions,
        answer,
    });

    addSelectQuestion = (question, answerOptions, answer) => ({
        id: this.questionId++,
        type: "select",
        question,
        answerOptions,
        answer,
    });

    questions = [
        this.addStringQuestion(
            "Question string custom",
            "Custom answer",
        ),
        this.addRadioQuestion(
            "Что обозначает формула H2O?",
            [
                { id: 1, value: "Гелий" },
                { id: 2, value: "Кислород" },
                { id: 3, value: "Воду" },
                { id: 4, value: "Аммиак" },
            ],
            3,
        ),
        this.addRadioQuestion(
            "Сколько океанов на нашей планете?",
            [
                { id: 1, value: "Гелий" },
                { id: 2, value: "Кислород" },
                { id: 3, value: "Воду" },
                { id: 4, value: "Аммиак" },
            ],
            3,
        ),
        this.addCheckboxQuestion(
            "Question checkbox custom",
            [
                { id: 1, value: "var 1" },
                { id: 2, value: "var 2" },
                { id: 3, value: "var 3" },
            ],
            [
                2, 3,
            ],
        ),
        this.addSelectQuestion(
            "Question checkbox custom",
            [
                { id: 1, value: "var 1" },
                { id: 2, value: "var 2" },
                { id: 3, value: "var 3" },
            ],
            1,
        ),
    ];

    getQuestionsList = () => new Promise((resolve) => {
        setTimeout(() => {
            resolve(this.questions);
        }, 1000);
    })
}
