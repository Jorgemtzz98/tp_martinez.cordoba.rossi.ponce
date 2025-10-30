import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./styles/navbar.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <header>
  <nav className="nav-sanat">
    <div className="nav-container">
  <Link to="/" className="brand" onClick={close}>
    <div className="brand-logo">
      <img 
        src="/logo192.png" 
        alt="Sanatorio Central" 
        onError={(e) => { e.target.style.display = "none"; }} 
      />
    </div>
    <span className="brand-text">
      Sanatorio <span className="brand-accent">Central</span>
    </span>
  </Link>

  <button className={`hamburger ${open ? "open" : ""}`} onClick={toggle}>
    <span className="bar"></span>
    <span className="bar"></span>
    <span className="bar"></span>
  </button>
</div>
    <div className={`nav-links ${open ? "show" : ""}`}>
      <NavLink to="/" onClick={close}>Home</NavLink>
      <NavLink to="/pacientes" onClick={close}>Pacientes</NavLink>
      <NavLink to="/turnos" onClick={close}>Turnos</NavLink>
      <NavLink to="/profesionales" onClick={close}>Profesionales</NavLink>
      <NavLink to="/obrasSociales" onClick={close}>Obras Sociales</NavLink>
    </div>
  </nav>
</header>
  );
}

export default Navbar;