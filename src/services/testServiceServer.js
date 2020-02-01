export default class TestServiceServer {
    _apiBase = `http://localhost:3000`;

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url},`
                + `received ${res.status}`);
        }

        return await res.json();
    };

    getQuestionsList = async () => (
        await this.getResource(`/questions`)
    );
}
