import React, { useRef, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";

import Chart from "chart.js";

const TOTAL_SEMANAS_ANO = 52.1429;
const TOTAL_JOGOS_SEMANA_MEGA_SENA = 2;

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

    return (
        <>
            <p className="text-center">{props.numeros.join(", ")}</p>

            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <canvas ref={chartRef} />
                    </div>
                    <div className="col-md-6">
                        <div
                            style={{
                                display: props.totalJogadas ? "block" : "none",
                            }}
                        >
                            <p>
                                Você precisaria jogar{" "}
                                {props.totalJogadas.toLocaleString("pt-BR")}{" "}
                                vezes para ganhar com esses números
                            </p>
                            <p>
                                Você gastaria{" "}
                                {(props.totalJogadas * 4.5).toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL",
                                    }
                                )}{" "}
                                para ganhar
                            </p>
                            <p>
                                Voce precisaria de{" "}
                                {(
                                    props.totalJogadas /
                                    TOTAL_JOGOS_SEMANA_MEGA_SENA /
                                    TOTAL_SEMANAS_ANO
                                ).toFixed(2)}{" "}
                                anos para ganhar
                            </p>
                        </div>
                        <button
                            className="btn btn-success"
                        >
                            JOGAR NOVAMENTE
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Resultado;
