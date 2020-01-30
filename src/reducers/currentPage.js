const currentPage = (state, action) => {
    if (state === undefined) {
        return "/";
    }

    switch (action.type) {
    case "CHANGE_PAGE":
        console.log("CHANGE_PAGE");
        return action.payload;
    default:
        return state.currentPage;
    }
};

export default currentPage;
