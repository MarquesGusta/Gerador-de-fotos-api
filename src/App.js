import React from "react";
import Main from  "./componentes/funcoes/main";
import Footer from "./componentes/footer/index";
import "./componentes/funcoes/style.css";


export default function App(){
  return(
    <section>
      <div className="container">
        < Main />
        <Footer/>
      </div>
    </section>
  );
}
