import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "./Modal";

function ModalComoFunciona() {
    const [isModalOpen, toggleModal] = useState(false);

    return (
        <>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <h4>Como funciona</h4>
                <br />
                <p>
                    Selecione os numeros e clique em apostar, o jogo fara uma
                    simulação de uma aposta, caso você não saia vencedor, o jogo
                    ira apostar novamente com os mesmos numeros.. inumeras
                    vezes.. até acertar todos os numeros!
                    <br />
                    <br />
                    Os jogos são feitos de maneira aleatória, simulando a
                    dificuldade de se ganhar em uma loteria
                    <br />
                    <br />
                    Ao final você recebara algumas estatisticas sobre como foi o
                    desempenho dos numeros escolhidos
                </p>
            </Modal>
            <a
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => toggleModal(!isModalOpen)}
            >
                <FaInfoCircle /> como funciona
            </a>
        </>
    );
}

export default ModalComoFunciona;
