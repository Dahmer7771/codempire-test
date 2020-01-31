import React from "react";
import { Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        maxWidth: 310,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        margin: theme.spacing(0, 1),
    },
}));

const ModalWindow = ({
    isModalWindowOpen, closeModalWindow, allowShowAnswers, history,
}) => {
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={isModalWindowOpen}
            onClose={() => closeModalWindow()}
        >
            <div className={classes.paper}>
                <h2 id="simple-modal-title">Предупреждение</h2>
                <p id="simple-modal-description">
                    Каждый вопрос без ответа считается неправильным.
                    Вы уверены что хотите продолжить?
                </p>
                <div className={classes.buttonsContainer}>
                    <Button
                        className={classes.button}
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            closeModalWindow();
                            allowShowAnswers(true);
                            history.push("/result");
                        }}
                    >
                        Да
                    </Button>
                    <Button
                        className={classes.button}
                        variant="outlined"
                        color="secondary"
                        onClick={closeModalWindow}
                    >
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalWindow;
