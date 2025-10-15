import ProfesionalForm from "../components/ProfesionalForm";
import ProfesionalList from "../components/ProfesionalList";

function ProfesionalPage() {
  return (
    <div className="container mt-4">
      <ProfesionalForm />
      <ProfesionalList />
    </div>
  );
}

export default ProfesionalPage;