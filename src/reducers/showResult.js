const showResult = (state, action) => {
    if (state === undefined) {
        return false;
    }

    switch (action.type) {
    case "ALLOW_SHOW_ANSWERS":
        return action.payload;
    default:
        return state.showResult;
    }
};

export default showResult;
