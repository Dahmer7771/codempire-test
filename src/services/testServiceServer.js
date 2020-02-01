export default class TestServiceServer {
    _apiBase = `http://localhost:3000`;

    getQuestionsList = async () => (
        await fetch(`${this._apiBase}/questions`)
    );
}
