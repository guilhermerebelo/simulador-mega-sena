import React, { useState } from "react";
import _ from "lodash";
import { FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";
import Loader from "./Loader";
import Megasena from "./Megasena";

function App() {
    const [numeros, setNumeros] = useState([1, 10, 20, 30, 40, 50]);
    const [totalJogadas, setTotalJogadas] = useState(0);
    const [tracker, setTracker] = useState(false);

    const changeNumeros = (e, index) => {
        numeros[index] = parseInt(e.target.value);
        setNumeros(numeros);
    };

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
            <Megasena />
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
            <div style={{ height: 120 }}></div>
            <div className="container">
                <section>
                    <p className="font-weight-light">
                        JOGUE 6 NÚMEROS E TENTE A SORTE!
                    </p>
                    <br />
                    <div className="input-group input-group-lg">
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                            onChange={(e) => changeNumeros(e, 0)}
                        />
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                            onChange={(e) => changeNumeros(e, 1)}
                        />
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                            onChange={(e) => changeNumeros(e, 2)}
                        />
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                            onChange={(e) => changeNumeros(e, 3)}
                        />
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                            onChange={(e) => changeNumeros(e, 4)}
                        />
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                            onChange={(e) => changeNumeros(e, 5)}
                        />
                    </div>
                    <br />
                    <div className="mx-auto" style={{ width: 120 }}>
                        <button
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
