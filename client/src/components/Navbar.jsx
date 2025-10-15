import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center" onClick={close}>
            <img
              src="/logo192.png"
              alt="Sanatorio Central"
              style={{ height: 40, width: "auto" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <span className="ms-2 fw-bold">Sanatorio Central</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="main-navbar"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={toggle}
          >
            <span className="navbar-toggler-icon" />
          </button>



            <div className="d-flex gap-2">
              <NavLink to="/" className="btn btn-outline-success" onClick={close}>
                Home
              </NavLink>
              <NavLink to="/pacientes" className="btn btn-outline-primary" onClick={close}>
                Pacientes
              </NavLink>
              <NavLink to="/turnos" className="btn btn-outline-success" onClick={close}>
                Turnos
              </NavLink> 
              <NavLink to="/profesionales" className="btn btn-outline-primary" onClick={close}>
                Profesionales
              </NavLink>
              <NavLink to="/obrasSociales" className="btn btn-outline-success" onClick={close}>
                Obras Sociales
              </NavLink>
            </div>
          </div>
      </nav>
    </header>
  );
}

export default Navbar;