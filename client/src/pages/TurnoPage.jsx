import TurnoForm from "../components/TurnoForm";
import TurnoList from "../components/TurnoList";

function TurnoPage() {
  return (
    <div className="container mt-4">
      <TurnoForm />
      <TurnoList />
    </div>
  );
}

export default TurnoPage;