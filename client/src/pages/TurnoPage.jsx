import { useState } from "react";
import TurnoForm from "../components/TurnoForm";
import TurnoList from "../components/TurnoList";
import "../components/styles/page.css";

function TurnoPage() {
  const [vista, setVista] = useState("menu"); 

  const renderVista = () => {
    switch (vista) {
      case "crear":
        return (
          <>
            <h3 className="text-center mb-4">Crear nuevo turno</h3>
            <TurnoForm />
            <div className="text-center mt-3">
              <button className="btn btn-secondary" onClick={() => setVista("menu")}>
                Volver al menú
              </button>
            </div>
          </>
        );
      case "listar":
        return (
          <>
            <h3 className="text-center mb-4">Lista de turnos</h3>
            <TurnoList />
            <div className="text-center mt-3">
              <button className="btn btn-secondary" onClick={() => setVista("menu")}>
                Volver al menú
              </button>
            </div>
          </>
        );
      default:
        return (
          <div className="text-center">
            <h2 className="mb-4">📅 Gestión de Turnos</h2>
            <p className="text-muted mb-4">Selecciona una acción para continuar:</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setVista("crear")}
              >
                ➕ Crear Turno
              </button>
              <button
                className="btn btn-success btn-lg"
                onClick={() => setVista("listar")}
              >
                📋 Listar Turnos
              </button>
            </div>
          </div>
        );
    }
  };

  return <div className="container mt-5">{renderVista()}</div>;
}

export default TurnoPage;