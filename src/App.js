import React, { useState } from "react";
import _ from "lodash";

import { FaArrowDown } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";

import TIPOS_CONFIGURACAO from "./configuracaoService";
import ModalComoFunciona from "./ModalComoFunciona";
import ModalConfigurar from "./ModalConfigurar";
import Loader from "./Loader";
import Megasena from "./Megasena";
import Resultado from "./Resultado";

function App() {
    const [tipoConfiguracao, setTipoConfiguracao] = useState("MEGA_SENA");
    const [numeros, setNumeros] = useState([]);
    const [numerosMaisSorteados, setNumerosMaisSorteados] = useState({});
    const [totalJogadas, setTotalJogadas] = useState(0);
    const [tracker, setTracker] = useState(false);

    let numerosSorteados = {};

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

                    salvarNumero(numeroSorteado);

                    if (numeros.includes(numeroSorteado)) {
                        resultados.push(true);
                    }
                }

                ganhou = resultados.length === 6;
            }

            setNumerosMaisSorteados(getNumerosMaisSorteados(numerosSorteados));

            setTotalJogadas(contadorJogadas);
            setTracker(false);
        }, 1000);
    };

    const salvarNumero = (numeroSorteado) => {
        numerosSorteados[numeroSorteado] =
            (numerosSorteados[numeroSorteado] || 0) + 1;
    };

    const sortearNumero = (resultados) => {
        do {
            var numeroSorteado = _.random(1, 60);
        } while (resultados.includes(numeroSorteado));

        return numeroSorteado;
    };

    function getNumerosMaisSorteados(numerosSorteados) {
        return Object.entries(numerosSorteados)
            .map((e) => ({
                key: e[0],
                value: e[1],
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 6)
            .sort((a, b) => a.key - b.key);
    }

    function disabledButtonApostar() {
        return (
            numeros.length <
            TIPOS_CONFIGURACAO[tipoConfiguracao].maximoSelecionados
        );
    }

    function verResultado() {
        window.scrollTo({
            top: 99999,
            behavior: "smooth",
        });
    }

    return (
        <>
            {tracker && <Loader />}

            {/* criar um componente  */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <ModalConfigurar
                                            setConfiguracao={
                                                setTipoConfiguracao
                                            }
                                            className="nav-link"
                                        />
                                    </li>
                                    <li className="nav-item">
                                        <ModalComoFunciona className="nav-link" />
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            <Megasena
                config={TIPOS_CONFIGURACAO[tipoConfiguracao]}
                numerosSelecionados={setNumeros}
            />

            <br />
            <br />

            <div className="container">
                <div
                    className="mx-auto text-center"
                    style={{
                        width: 120,
                        display: totalJogadas ? "none" : "block",
                    }}
                >
                    <button
                        style={{
                            borderRadius: 50,
                            height: 75,
                            width: 75,
                        }}
                        disabled={disabledButtonApostar()}
                        onClick={jogar}
                        className="btn btn-success"
                    >
                        JOGAR
                    </button>
                </div>
                <div
                    style={{
                        display: totalJogadas ? "block" : "none",
                        width: 120,
                    }}
                    className="mx-auto text-center"
                >
                    RESULTADO
                    <br />
                    <div className="meg__arrow-effect" onClick={verResultado}>
                        <FaArrowDown size={40} style={{ fill: "black" }} />
                    </div>
                </div>
            </div>

            <br />
            <br />

            {totalJogadas && (
                <Resultado
                    totalJogadas={totalJogadas}
                    numeros={numeros}
                    numerosMaisSorteados={numerosMaisSorteados}
                />
            )}
        </>
    );
}

export default App;
