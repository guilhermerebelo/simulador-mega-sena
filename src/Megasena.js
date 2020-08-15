import React, { useState, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import _, { parseInt } from "lodash";

// https://www.google.com/search?q=mega+sena&safe=off&sxsrf=ALeKk02fWi7rTN63Jn-5RYnCZZNzQpzDHg:1595305594727&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjN1pu6wN3qAhUDJrkGHQ7CB5sQ_AUoBHoECBEQBg&biw=1360&bih=657#imgrc=1oeysmELaztvBM

const MEGA_SENA = {
    maximoSelecionados: 6,
    linhas: 6,
    colunas: 10,
};

function Megasena(props) {
    let config = props.config || MEGA_SENA;

    const [numeros, setNumeros] = useState([]);

    props.numerosSelecionados(numeros);

    useEffect(() => {
        resetSelecionados();
    }, [config]);

    const selecionar = (e) => {
        let numero = parseInt(e.target.innerText);

        numeros.includes(numero)
            ? removerNumero(e, numero)
            : numeros.length < config.maximoSelecionados &&
              incluirNumero(e, numero);
    };

    const resetSelecionados = () => {
        setNumeros([]);

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

    function indexCel(line, cel) {
        return parseInt(`${line}${cel}`) + 1;
    }

    const buildGame = () => {
        return _.range(config.linhas).map((line) => {
            return (
                <>
                    <div className="row meg__conteudo">
                        {_.range(config.colunas).map((cel) => {
                            return (
                                <>
                                    <button
                                        className={`meg__cel meg__cel_${indexCel(
                                            line,
                                            cel
                                        )}`}
                                        onClick={selecionar}
                                    >
                                        {indexCel(line, cel)}
                                    </button>
                                </>
                            );
                        })}
                    </div>
                </>
            );
        });
    };

    return (
        <>
            <div className="container meg__container">
                <div className="meg__header">
                    <h4 className="text-success">
                        ESCOLHA SEUS NÚMEROS DA SORTE
                    </h4>
                </div>
                <div>{buildGame()}</div>
                <div>{numeros}</div>
            </div>
        </>
    );
}

export default Megasena;
