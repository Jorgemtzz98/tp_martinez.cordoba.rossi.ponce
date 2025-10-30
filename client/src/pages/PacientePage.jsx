import { useState } from "react";
import PacienteForm from "../components/PacienteForm";
import PacienteList from "../components/PacienteList";
import "../components/styles/page.css";

function PacientePage() {
  const [vista, setVista] = useState("menu");

  const renderVista = () => {
    switch (vista) {
      case "crear":
        return (
          <>
            <h3 className="text-center mb-4">Registrar nuevo paciente</h3>
            <PacienteForm />
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
            <h3 className="text-center mb-4">Lista de pacientes</h3>
            <PacienteList />
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
            <h2 className="mb-4">🧑‍🤝‍🧑 Gestión de Pacientes</h2>
            <p className="text-muted mb-4">Selecciona una acción para continuar:</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                className="btn-sanat btn-sanat-primary btn-sanat-lg"//cambio en boton
                onClick={() => setVista("crear")}
              >
                ➕ Registrar Paciente
              </button>
              <button
                className="btn-sanat btn-sanat-info btn-sanat-lg"
                onClick={() => setVista("listar")}
              >
                📋 Listar Pacientes
              </button>
            </div>
          </div>
        );
    }
  };

  return <div className="container mt-5">{renderVista()}</div>;
}

export default PacientePage;