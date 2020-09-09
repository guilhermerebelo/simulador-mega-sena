import React, { useRef, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";

import { Emoji } from "emoji-mart";

import "./style.css";
import "bootstrap/dist/css/bootstrap.css";

import Chart from "chart.js";

const TOTAL_SEMANAS_ANO = 52.1429;
const TOTAL_JOGOS_SEMANA_MEGA_SENA = 2;

function InfoIcon(props) {
    return (
        <>
            <FaInfoCircle style={{ fill: "black" }} />
        </>
    );
}

function Resultado(props) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            buildChart();
        }
    });

    function buildChart() {
        new Chart(chartRef.current, {
            type: "bar",
            data: {
                labels: props.numerosMaisSorteados.map((item) => item.key),
                datasets: [
                    {
                        label: "Mais sorteados",
                        data: props.numerosMaisSorteados.map(
                            (item) => item.value
                        ),
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
        });
    }

    function buscarNumerosAcertouPrimeiraJogada() {
        let numerosAcertou = props.primeiroNumeroSorteado.filter((numero) => {
            return props.numeros.includes(numero);
        });

        if (numerosAcertou.length) {
            return ` Você acertou os números:  ${numerosAcertou.join(", ")}`;
        }

        return " Não acertou nenhum número";
    }

    function recarregar() {
        window.location.reload();
    }

    function verificarSeGanhou() {
        if (buscarNumerosAcertouPrimeiraJogada().length === 6) {
            return (
                <>
                    <Emoji emoji=":money_mouth_face:" size={35} />
                    <Emoji emoji=":money_mouth_face:" size={35} />
                    {"  "} VOCÊ GANHOU {"  "}
                    <Emoji emoji=":money_mouth_face:" size={35} />
                    <Emoji emoji=":money_mouth_face:" size={35} />
                </>
            );
        }

        return (
            <>
                <Emoji emoji=":money_with_wings:" size={35} />
                <Emoji emoji=":money_with_wings:" size={35} />
                {"  "} VOCÊ PERDEU {"  "}
                <Emoji emoji=":money_with_wings:" size={35} />
                <Emoji emoji=":money_with_wings:" size={35} />
            </>
        );
    }

    return (
        <>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>{verificarSeGanhou()}</h1>
                        </div>
                        <div className="col-md-12 text-center">
                            <h2>
                                <span className="badge badge-success">
                                    {props.numeros.join(", ")}
                                </span>
                            </h2>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="col-md-7">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Números mais sorteados
                                    </h5>
                                    <p className="card-body">
                                        <canvas ref={chartRef} />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Estatísticas</h5>
                                    <div className="card-body">
                                        <p>
                                            <InfoIcon />{" "}
                                            {props.primeiroNumeroSorteado.join(
                                                ", "
                                            )}{" "}
                                            foram os números sorteados
                                        </p>
                                        <p>
                                            <InfoIcon />
                                            {buscarNumerosAcertouPrimeiraJogada()}
                                        </p>
                                        <p>
                                            <InfoIcon /> Você precisaria jogar{" "}
                                            {props.totalJogadas.toLocaleString(
                                                "pt-BR"
                                            )}{" "}
                                            vezes para ganhar com esses números
                                        </p>
                                        <p>
                                            <InfoIcon /> Você gastaria{" "}
                                            {(
                                                props.totalJogadas * 4.5
                                            ).toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}{" "}
                                            para ganhar com esses números
                                        </p>
                                        <p>
                                            <InfoIcon /> Você precisaria de{" "}
                                            {(
                                                props.totalJogadas /
                                                TOTAL_JOGOS_SEMANA_MEGA_SENA /
                                                TOTAL_SEMANAS_ANO
                                            ).toFixed(2)}{" "}
                                            anos para ganhar com esses números
                                        </p>
                                        <a
                                            className="btn btn-light"
                                            onClick={recarregar}
                                        >
                                            Jogar novamente
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Resultado;
