import React, { useState } from "react";
import _, { parseInt } from "lodash";
import { FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";
import Loader from "./Loader";
import Megasena from "./Megasena";

function App() {
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

    const changeNumeros = (numerosSelecionados) => {
        setNumeros(numerosSelecionados);
    };

    return (
        <>
            {tracker && <Loader />}
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    como funciona
                                </a>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FaGithub />
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </nav>
            </div>
            <Megasena numerosSelecionados={changeNumeros} />
            <div className="container">
                <section>
                    <div className="mx-auto" style={{ width: 120 }}>
                        <button
                            disabled={numeros.length < 6}
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
