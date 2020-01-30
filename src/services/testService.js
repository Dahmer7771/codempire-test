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
            "Какой элемент периодической системы химических элементов обозначается как Ag?",
            "Аргон",
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
                { id: 1, value: "3" },
                { id: 2, value: "4" },
                { id: 3, value: "5" },
                { id: 4, value: "6" },
            ],
            3,
        ),
        this.addCheckboxQuestion(
            "Какие две самые длинные реки в мире?",
            [
                { id: 1, value: "Амазонка" },
                { id: 2, value: "Миссисипи" },
                { id: 3, value: "Янцзы" },
                { id: 4, value: "Нил" },
            ],
            [
                1, 4,
            ],
        ),
        this.addSelectQuestion(
            "Какое число обозначается римскими цифрами LXXVII",
            [
                { id: 1, value: "127" },
                { id: 2, value: "97" },
                { id: 3, value: "77" },
            ],
            3,
        ),
    ];

    getQuestionsList = () => new Promise((resolve) => {
        setTimeout(() => {
            resolve(this.questions);
        }, 1000);
    })
}
