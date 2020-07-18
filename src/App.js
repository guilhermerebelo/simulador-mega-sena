import React, { useState } from "react";
import _ from "lodash";
import { FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";

function App() {
    let todosResultados = [];

    const [numeros, setNumeros] = useState([]);

    // const [totalAcertos, setTotalAcertos] = useState();
    // const [numerosJogados, setNumerosJogados] = useState();
    // const [numerosSorteados, setNumerosSorteados] = useState();

    const changeNumeros = (e, index) => {
        numeros[index] = parseInt(e.target.value);
        setNumeros(numeros);
    };

    const jogar = (e) => {
        let resultados = [];
        for (let index = 0; index < 6; index++) {
            let numeroSorteado = sortearNumero(resultados);
            resultados.push({
                numeroSorteado: numeroSorteado,
                isCerto: _.includes(numeros, numeroSorteado),
            });
        }
        let ganhou = calcularResultado(resultados);
        if (ganhou) {
            exibirResultados();
        } else {
            jogar();
        }
    };

    const sortearNumero = (resultados) => {
        let numeroSorteado = _.random(1, 60);
        if (!_.includes(_.map(resultados, "numeroSorteado"), numeroSorteado)) {
            return numeroSorteado;
        } else {
            return sortearNumero(resultados);
        }
    };

    const calcularResultado = (resultados) => {
        todosResultados.push(resultados);
        return (
            _.filter(resultados, (resultado) => resultado.isCerto).length === 6
        );
    };

    const exibirResultados = () => {
        console.log(`total acertos: ${todosResultados.length}`);

        limparResultados();
    };

    const limparResultados = () => {
        todosResultados = [];
    };

    return (
        <>
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

                    {/* <div className="">
                        <p>{totalAcertos}</p>
                        <p>{numerosJogados}</p>
                        <p>{numerosSorteados}</p>
                    </div> */}
                </section>
            </div>
        </>
    );
}

export default App;
