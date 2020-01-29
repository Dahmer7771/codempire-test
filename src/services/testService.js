export default class TestService {
    questionId = 1;

    addStringQuestion = (title, question, answer) => ({
        id: this.questionId++,
        type: "string",
        title,
        question,
        answer,
    });

    addRadioQuestion = (title, question, answerOptions, answer) => ({
        id: this.questionId++,
        type: "radio",
        title,
        question,
        answerOptions,
        answer,
    });

    addCheckboxQuestion = (title, question, answerOptions, answer) => ({
        id: this.questionId++,
        type: "checkbox",
        title,
        question,
        answerOptions,
        answer,
    });

    addSelectQuestion = (title, question, answerOptions, answer) => ({
        id: this.questionId++,
        type: "select",
        title,
        question,
        answerOptions,
        answer,
    });

    questions = [
        this.addStringQuestion(
            "Custom string question",
            "Question string custom",
            "Custom answer",
        ),
        this.addRadioQuestion(
            "Custom radio question",
            "Question radio custom",
            [
                { id: 1, value: "var 1" },
                { id: 2, value: "var 2" },
                { id: 3, value: "var 3" },
            ],
            3,
        ),
        this.addCheckboxQuestion(
            "Custom checkbox question",
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
            "Custom checkbox question",
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
