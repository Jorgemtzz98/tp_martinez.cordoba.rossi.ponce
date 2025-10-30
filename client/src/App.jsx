import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PacientePage from "./pages/PacientePage";
import TurnoPage from "./pages/TurnoPage";
import ProfesionalPage from "./pages/ProfesionalPage";
import ObraSocialPage from "./pages/ObraSocialPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pacientes" element={<PacientePage />} />  
          <Route path="/turnos" element={<TurnoPage />} />
          <Route path="/profesionales" element={<ProfesionalPage />} />
          <Route path="/obrasSociales" element={<ObraSocialPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;