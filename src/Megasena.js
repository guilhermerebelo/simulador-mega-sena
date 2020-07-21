import React, { useState } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import _ from "lodash";

// https://www.google.com/search?q=mega+sena&safe=off&sxsrf=ALeKk02fWi7rTN63Jn-5RYnCZZNzQpzDHg:1595305594727&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjN1pu6wN3qAhUDJrkGHQ7CB5sQ_AUoBHoECBEQBg&biw=1360&bih=657#imgrc=1oeysmELaztvBM

const MEGA_SENA = {
    maximoSelecionados: 6,
    linhas: 6,
    colunas: 10,
};

function Megasena(props) {
    let config = props.config || MEGA_SENA;

    const [numeros, setNumeros] = useState([]);

    const selecionar = (e) => {
        let numero = e.target.innerText;

        numeros.includes(numero)
            ? removerNumero(e, numero)
            : numeros.length < config.maximoSelecionados &&
              incluirNumero(e, numero);
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
        return _.map(_.range(config.linhas), (line) => {
            return (
                <>
                    <div className="row meg__conteudo">
                        {_.map(_.range(config.colunas), (cel) => {
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
                dasd {numeros}
            </div>
        </>
    );
}

export default Megasena;
