import React, { useState, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import _, { parseInt } from "lodash";

function Megasena(props) {
    const setNumeros = props.setNumeros;
    const numeros = props.numeros;

    let config = props.config;

    resetSelecionados();

    const selecionar = (e) => {
        let numero = parseInt(e.target.innerText);

        numeros.includes(numero)
            ? removerNumero(e, numero)
            : numeros.length < config.maximoSelecionados &&
              incluirNumero(e, numero);
    };

    function resetSelecionados() {
        let cels = document.querySelectorAll(".meg__cel_mark");

        if (cels.length) {
            cels.forEach((node) => {
                let styleClass = node
                    .getAttribute("class")
                    .replace("meg__cel_mark", "");

                node.setAttribute("class", styleClass);
            });
        }
    };

    function removerNumero(e, numero) {
        let styleClass = e.target
            .getAttribute("class")
            .replace("meg__cel_mark", "");

        e.target.setAttribute("class", styleClass);

        setNumeros((numeros) => numeros.filter((n) => n !== numero));
    }

    function incluirNumero(e, numero) {
        e.target.setAttribute(
            "class",
            `${e.target.getAttribute("class")} meg__cel_mark`
        );
        setNumeros((n) => [...n, numero]);
    }

    const buildGame = () => {
        let counter = 0;

        return _.range(config.linhas).map((line, key) => {
            return (
                <div key={key} className="row meg__conteudo">
                    {_.range(config.colunas).map((cel, index) => {
                        counter++;
                        return (
                            <button
                                key={counter}
                                className={`meg__cel meg__cel_${counter}`}
                                onClick={selecionar}
                            >
                                {counter}
                            </button>
                        );
                    })}
                </div>
            );
        });
    };

    return (
        <>
            <div className="meg__header">
                <h4 className="text-success">ESCOLHA SEUS NÚMEROS DA SORTE</h4>
            </div>
            <div className="text-center">
                <span className="badge badge-success" style={{ fontSize: 15 }}>
                    {numeros.join(", ") || "-"}
                </span>
            </div>
            <div>{buildGame()}</div>
        </>
    );
}

export default Megasena;
