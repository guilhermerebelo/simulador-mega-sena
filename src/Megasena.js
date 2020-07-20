import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import _, { isInteger } from "lodash";

function Megasena(props) {
    let config = props.config;

    const buildGame = () => {
        return _.map(_.range(6), (line) => {
            return (
                <>
                    <div className="row meg__conteudo">
                        {_.map(_.range(10), (cel) => {
                            return (
                                <>
                                    <button className="meg__cel">
                                        {parseInt(`${line}${cel}`) + 1}
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
                <div className="meg__header">logo</div>
                <div>{buildGame()}</div>
            </div>
        </>
    );
}

export default Megasena;
