import React, { useState, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "./Modal";
import TIPOS_CONFIGURACAO from "./configuracaoService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CONFIG_TOAST = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
};

function ModalComoFunciona(props) {
    const [configuracao, setConfiguracao] = useState('MEGA_SENA');
    const [isModalOpen, toggleModal] = useState(false);

    const salvar = () => {
        toast.success("Configuração salva!", CONFIG_TOAST);
        props.setConfiguracao(configuracao)
    };

    return (
        <>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <h4>Configurar</h4>
                <br />
                {Object.values(TIPOS_CONFIGURACAO).map((item, index) => {
                    return (
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="jogatina"
                                id={`jogatina${index}`}
                                onClick={() =>
                                    setConfiguracao(item.key)
                                }
                                defaultValue="option1"
                                defaultChecked={index === 0}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={`jogatina${index}`}
                            >
                                {item.descricao}
                            </label>
                        </div>
                    );
                })}

                <br />
                <div>
                    <button
                        type="button"
                        class="btn btn-success"
                        // disabled={!configuracao}
                        onClick={salvar}
                    >
                        SALVAR
                    </button>
                    <button
                        type="button"
                        class="btn btn-light"
                        onClick={() => toggleModal(false)}
                    >
                        CANCELAR
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
