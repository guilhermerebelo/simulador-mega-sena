import React, { useState } from "react";
import _ from "lodash";

import "bootstrap/dist/css/bootstrap.css";

import { ToastContainer, toast } from "react-toastify";

import TIPOS_CONFIGURACAO from "./configuracaoService";

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
    const [primeiroNumeroSorteado, setPrimeiroNumeroSorteado] = useState([]);
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

                    if (contadorJogadas === 1) {
                        setPrimeiroNumeroSorteado((oldArray) => [
                            ...oldArray,
                            numeroSorteado,
                        ]);
                    }

                    if (numeros.includes(numeroSorteado)) {
                        resultados.push(true);
                    }
                }

                ganhou = resultados.length === 6;
            }

            setNumerosMaisSorteados(getNumerosMaisSorteados(numerosSorteados));

            setTotalJogadas(contadorJogadas);
            setTracker(false);
            notificar("Processando resultado..");
            navegarPaginas(SEGUNDA_PAGINA, 2000);
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

    function notificar(messagem) {
        toast.success(messagem, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
        });
    }

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

    function navegarPaginas(offset, timer) {
        if (!timer) {
            scrollTo(offset);
        }

        setTimeout(() => {
            scrollTo(offset);
        }, timer);
    }

    function scrollTo(offset) {
        window.scrollTo({
            top: offset,
            behavior: "smooth",
        });
    }

    function changePage(e) {
        if (e.deltaY > 0) {
            navegarPaginas(SEGUNDA_PAGINA);
        } else {
            navegarPaginas(PRIMEIRA_PAGINA);
        }
    }

    return (
        <>
            <ToastContainer position="bottom-left" />
            <div onWheel={changePage} className="meg__page-all">
                <NavBar setTipoConfiguracao={setTipoConfiguracao} />
                <br />
                <br />
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div
                            className="col-md-12"
                            style={{ marginBottom: "20px" }}
                        >
                            <Megasena
                                config={TIPOS_CONFIGURACAO[tipoConfiguracao]}
                                numerosSelecionados={setNumeros}
                            />
                        </div>
                        <div className="mx-auto text-center">
                            <button
                                disabled={
                                    disabledButtonApostar() || !!totalJogadas
                                }
                                onClick={jogar}
                                className="btn btn-success"
                                type="button"
                            >
                                {tracker && (
                                    <>
                                        <span
                                            class="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        {"  "}
                                    </>
                                )}
                                JOGAR
                            </button>{" "}
                            <button
                                disabled={!totalJogadas}
                                className="btn btn-light"
                                onClick={() => navegarPaginas(SEGUNDA_PAGINA)}
                            >
                                RESULTADO
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                onWheel={changePage}
                className={"meg__page-all " + (totalJogadas ? "" : "d-none")}
            >
                {totalJogadas && (
                    <Resultado
                        totalJogadas={totalJogadas}
                        numeros={numeros}
                        numerosMaisSorteados={numerosMaisSorteados}
                        primeiroNumeroSorteado={primeiroNumeroSorteado}
                    />
                )}
            </div>
        </>
    );
}

export default App;
