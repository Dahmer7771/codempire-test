const switchModalWindow = (state, action) => {
    if (state === undefined) {
        return false;
    }

    switch (action.type) {
    case "OPEN_MODAL_WINDOW":
        return true;
    case "CLOSE_MODAL_WINDOW":
        return false;
    default:
        return state.isModalWindowOpen;
    }
};

export default switchModalWindow;
