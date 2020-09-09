import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "./Modal";
import TIPOS_CONFIGURACAO from "./configuracaoService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalComoFunciona(props) {
    const [configuracao, setConfiguracao] = useState("MEGA_SENA");
    const [isModalOpen, toggleModal] = useState(false);

    const salvar = () => {
        toast.success("Configuração salva!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
        });

        props.setConfiguracao(configuracao);
    };

    return (
        <>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <h4>Configurar</h4>
                <br />
                {Object.values(TIPOS_CONFIGURACAO).map((item, index) => {
                    return (
                        <div className="form-check" key={index}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="jogatina"
                                id={`jogatina${index}`}
                                onClick={() => setConfiguracao(item.key)}
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
                        className="btn btn-success"
                        onClick={salvar}
                    >
                        SALVAR
                    </button>
                    <button
                        type="button"
                        className="btn btn-light" class="btn btn-light"
                        onClick={() => toggleModal(false)}
                    >
                        CANCELAR
                    </button>
                </div>
            </Modal>
            <a
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => toggleModal(!isModalOpen)}
            >
                <FaCog /> configurar
            </a>

            <ToastContainer position="bottom-left" />
        </>
    );
}

export default ModalComoFunciona;
