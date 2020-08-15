import React, { useState } from "react";
import _ from "lodash";

import { FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";

import TIPOS_CONFIGURACAO from "./configuracaoService";
import ModalComoFunciona from "./ModalComoFunciona";
import ModalConfigurar from "./ModalConfigurar";
import Loader from "./Loader";
import Megasena from "./Megasena";

function App() {
    const [tipoConfiguracao, setTipoConfiguracao] = useState('MEGA_SENA');
    const [numeros, setNumeros] = useState([]);
    const [totalJogadas, setTotalJogadas] = useState(0);
    const [tracker, setTracker] = useState(false);

    const jogar = (e) => {
        setTracker(true);

        setTimeout(() => {
            let ganhou = false;
            let contadorJogadas = 0;

            while (!ganhou) {
                contadorJogadas++;
                let resultados = [];

                for (let index = 0; index < 6; index++) {
                    let numeroSorteado = sortearNumero(resultados);

                    if (numeros.includes(numeroSorteado)) {
                        resultados.push(true);
                    }
                }

                ganhou = resultados.length === 6;
            }

            setTotalJogadas(contadorJogadas);
            setTracker(false);
        }, 1000);
    };

    const sortearNumero = (resultados) => {
        do {
            var numeroSorteado = _.random(1, 60);
        } while (resultados.includes(numeroSorteado));

        return numeroSorteado;
    };

    return (
        <>
            {tracker && <Loader />}
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <ModalConfigurar setConfiguracao={setTipoConfiguracao} className="nav-link"/>
                            </li>
                            <li className="nav-item">
                                <ModalComoFunciona className="nav-link"/>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <Megasena config={TIPOS_CONFIGURACAO[tipoConfiguracao]} numerosSelecionados={setNumeros} />
            <div className="container">
                <section>
                    <div className="mx-auto" style={{ width: 120 }}>
                        <button
                            disabled={numeros.length < TIPOS_CONFIGURACAO[tipoConfiguracao].maximoSelecionados}
                            onClick={jogar}
                            className="btn btn-success btn-block"
                        >
                            JOGAR
                        </button>
                    </div>

                    <br />
                    <div style={{ display: totalJogadas ? "block" : "none" }}>
                        <p>
                            Você precisaria de{" "}
                            {totalJogadas.toLocaleString("pt-BR")} jogadas para
                            ganhar com esses números
                        </p>
                        <p>
                            Você gastaria{" "}
                            {(totalJogadas * 4.5).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}{" "}
                            para ganhar na mega sena
                        </p>
                        {/* <p>
                            Voce precisaria de tantos anos para ganhar na mega
                            sena
                        </p> */}
                    </div>
                </section>
            </div>
        </>
    );
}

export default App;
