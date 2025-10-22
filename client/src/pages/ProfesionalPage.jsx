import { useState } from "react";
import ProfesionalForm from "../components/ProfesionalForm";
import ProfesionalList from "../components/ProfesionalList";
import "../components/styles/page.css";

function ProfesionalPage() {
  const [vista, setVista] = useState("menu"); // "menu" | "crear" | "listar"

  const renderVista = () => {
    switch (vista) {
      case "crear":
        return (
          <>
            <h3 className="text-center mb-4">Registrar nuevo profesional</h3>
            <ProfesionalForm />
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
            <h3 className="text-center mb-4">Lista de profesionales</h3>
            <ProfesionalList />
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
            <h2 className="mb-4">👨‍⚕️ Gestión de Profesionales</h2>
            <p className="text-muted mb-4">Selecciona una acción para continuar:</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setVista("crear")}
              >
                ➕ Registrar Profesional
              </button>
              <button
                className="btn btn-success btn-lg"
                onClick={() => setVista("listar")}
              >
                📋 Listar Profesionales
              </button>
            </div>
          </div>
        );
    }
  };

  return <div className="container mt-5">{renderVista()}</div>;
}

export default ProfesionalPage;