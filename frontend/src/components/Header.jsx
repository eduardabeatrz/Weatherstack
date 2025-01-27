import React from "react";
import "../index.css";


const Header = () => {
  return (
    <header className="header-dark">
      <div className="container">
        <h1 className="logo">Weather Stack</h1>
        <nav className="nav">
        <button className="btn-dark" onClick={() => {
          window.location.href = "https://api.whatsapp.com/send?phone=5549999070306&text=Gostei!%20Est%C3%A1%20contratada...%20"; 
        }}
        > Contato
        </button>
        </nav>
      </div>
    </header>
  );
};


export default Header;
