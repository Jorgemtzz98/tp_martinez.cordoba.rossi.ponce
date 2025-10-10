import PacienteForm from "../components/PacienteForm";
import PacienteList from "../components/PacienteList";

function PacientePage() {
  return (
    <div className="container mt-4">
      <PacienteForm />
      <PacienteList />
    </div>
  );
}

export default PacientePage;