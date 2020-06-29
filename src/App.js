import React from "react";
import { FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";

function App() {
    return (
        <>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FaGithub />
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div style={{ height: 120 }}></div>

            <div className="container">
                <section>
                    <h4 className="font-weight-light">
                        JOGUE 6 NÚMEROS E TENTE A SORTE!
                    </h4>
                    <br />
                    <div className="input-group input-group-lg">
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                        />
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                        />
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                        />
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                        />
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                        />
                        <input
                            type="text"
                            className="col-md-2 form-control"
                            aria-label="Exemplo do tamanho do input"
                            aria-describedby="inputGroup-sizing-lg"
                        />
                    </div>
                    <br/>
                    <div className="mx-auto" style={{'width': 120}}>
                        <button className="btn btn-success btn-block">JOGAR</button>
                    </div>
                </section>
            </div>
        </>
    );
}

export default App;
