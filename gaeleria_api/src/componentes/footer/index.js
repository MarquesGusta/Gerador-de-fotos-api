import React from "react";
import imggit from "../../img/github_vetor.png";
import "./footer.css";

export default function Footer(){
    return(
        <div className="footer">
            <div className="links">
                    <a href="https://github.com/MelissaaGomes">Melissa Gomes |</a>
                    <a href="https://github.com/MarquesGusta">Gustavo Marques</a>
                </div>
                
                <img href='' src={imggit} alt="sei nao" className="vetor"/>
                <p className="credito">Créditos da API utilizada: Pexels</p>
        </div>
    );
}