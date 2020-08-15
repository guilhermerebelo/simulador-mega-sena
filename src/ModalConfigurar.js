import React, { useState, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "./Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CONFIG_TOAST = {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
};

function ModalComoFunciona(props) {
    const [isModalOpen, toggleModal] = useState(false);

    const salvar = () => {
        toast.success("Configuração salva!", CONFIG_TOAST);
    };

    return (
        <>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <h4>Configurar</h4>
                <br />
                <div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="jogatina"
                            id="jogatina1"
                            defaultValue="option1"
                            defaultChecked
                        />
                        <label className="form-check-label" htmlFor="jogatina1">
                            Megasena
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="jogatina"
                            id="jogatina2"
                            defaultValue="option2"
                        />
                        <label className="form-check-label" htmlFor="jogatina2">
                            Lotofacil
                        </label>
                    </div>
                </div>
                <br />
                <div>
                    <button
                        type="button"
                        class="btn btn-success"
                        onClick={salvar}
                    >
                        Salvar
                    </button>
                    <button
                        type="button"
                        class="btn btn-light"
                        onClick={() => toggleModal(false)}
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>
            <a
                className={props.className}
                style={{ cursor: "pointer" }}
                onClick={() => toggleModal(!isModalOpen)}
            >
                configurar
            </a>

            <ToastContainer position="bottom-left" />
        </>
    );
}

export default ModalComoFunciona;
