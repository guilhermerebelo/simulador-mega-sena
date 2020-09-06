import React, { useState } from "react";
import _ from "lodash";

import { FaArrowDown } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";

import TIPOS_CONFIGURACAO from "./configuracaoService";

import Loader from "./Loader";
import NavBar from "./NavBar";
import Megasena from "./Megasena";
import Resultado from "./Resultado";

const PRIMEIRA_PAGINA = 0;
const SEGUNDA_PAGINA = 9999;

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

    function navegarPaginas(offset) {
        window.scrollTo({
            top: offset,
            behavior: "smooth",
        });
    }

    function changePage(e) {
        debugger
        if (e.deltaY > 0) {
            navegarPaginas(SEGUNDA_PAGINA);
        } else {
            navegarPaginas(PRIMEIRA_PAGINA);
        }
    }

    return (
        <>
            {/* {tracker && <Loader />} */}
            <div onWheel={changePage} className="meg__page-all">
                <NavBar setTipoConfiguracao={setTipoConfiguracao} />

                <Megasena
                    config={TIPOS_CONFIGURACAO[tipoConfiguracao]}
                    numerosSelecionados={setNumeros}
                />

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
                        <div
                            className="meg__arrow-effect"
                            onClick={() => navegarPaginas(SEGUNDA_PAGINA)}
                        >
                            <FaArrowDown size={40} style={{ fill: "black" }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* {totalJogadas && (
                <div onWheel={changePage} className="meg__page-all">
                    <Resultado
                        totalJogadas={totalJogadas}
                        numeros={numeros}
                        numerosMaisSorteados={numerosMaisSorteados}
                    />
                </div>
            )} */}

            <div
                onWheel={changePage}
                className={"meg__page-all " + (totalJogadas ? "" : "d-none")}
            >
                {totalJogadas && (
                    <Resultado
                        totalJogadas={totalJogadas}
                        numeros={numeros}
                        numerosMaisSorteados={numerosMaisSorteados}
                    />
                )}
            </div>
        </>
    );
}

export default App;
