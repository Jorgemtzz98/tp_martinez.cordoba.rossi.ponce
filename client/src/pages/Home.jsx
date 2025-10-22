import React from "react";
import "../components/styles/home.css";

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Sanatorio Central</h1>
        <p className="home-lead">
          Cuidando tu salud desde 1950 con dedicación y compromiso.
        </p>
      </header>

      <section className="home-section">
        <h2>Nuestra Historia</h2>
        <p>
          Fundado hace más de 70 años, Sanatorio Central se ha convertido en un
          referente de la atención médica de calidad en la región. Nuestra misión
          es brindar servicios de salud integrales, combinando tecnología avanzada
          con un equipo humano comprometido y profesional.
        </p>
        <p>
          A lo largo de las décadas, hemos crecido y evolucionado, siempre manteniendo
          nuestro foco en la excelencia y el bienestar de nuestros pacientes.
        </p>
      </section>

      <section className="home-section">
        <h2>Nuestras Instalaciones</h2>
        <div className="home-gallery">
          <div className="home-gallery-item">
            <img
              src="https://media.istockphoto.com/id/185795018/es/foto/sala-de-emergencias-del-hospital.jpg?s=612x612&w=0&k=20&c=aBZKw4dBbXORwnJFhDq374RMHm4MdHXTh-voMFX34oM="
              alt="Entrada del hospital"
            />
            <p>Entrada Principal</p>
          </div>
          <div className="home-gallery-item">
            <img
              src="https://img.freepik.com/foto-gratis/cientificos-tiro-medio-posando-juntos_23-2148969982.jpg"
              alt="Equipo médico"
            />
            <p>Equipo Médico</p>
          </div>
          <div className="home-gallery-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMMz3y5tUPUOHyZFo9Wrpr6jWn3gYKNGOk9r5V-SGTshHlrUMTsgmpX97fj7yv4TfTa44&usqp=CAU"
              alt="Sala de pacientes"
            />
            <p>Sala de Pacientes</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;