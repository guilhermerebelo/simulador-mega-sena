import React, { useState } from "react";

import ModalComoFunciona from "./ModalComoFunciona";
import ModalConfigurar from "./ModalConfigurar";

import "./style.css";

function NavBar(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <ModalConfigurar
                                        setConfiguracao={props.setTipoConfiguracao}
                                    />
                                </li>
                                <li className="nav-item">
                                    <ModalComoFunciona />
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
