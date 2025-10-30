import React, { useState, useEffect } from "react";
import "../components/styles/home.css";

function Home() {
  const instalacionesImages = [
    {
      src: "https://media.istockphoto.com/id/185795018/es/foto/sala-de-emergencias-del-hospital.jpg?s=612x612&w=0&k=20&c=aBZKw4dBbXORwnJFhDq374RMHm4MdHXTh-voMFX34oM=",
      alt: "Entrada del hospital",
      caption: "Entrada Principal",
    },
    {
      src: "https://img.freepik.com/foto-gratis/cientificos-tiro-medio-posando-juntos_23-2148969982.jpg",
      alt: "Equipo médico",
      caption: "Equipo Médico",
    },
    {
      src: "https://src.armincoinc.com/data/img/blog/modern-waiting-room-ideas-that-will-impress-patients/empty-modern-hospital-corridor.jpg",
      alt: "Sala de pacientes",
      caption: "Sala de Pacientes",
    },
  ];

  const [instalIndex, setInstalIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setInstalIndex((prev) => (prev + 1) % instalacionesImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const equipamientoImages = [
    {
      src: "https://www.ucinmedica.com/wp-content/uploads/2020/06/equipo-medico-hospital.jpg",
      alt: "Equipo Médico 1",
    },
    {
      src: "https://www.hcmarbella.com/wp-content/uploads/2019/01/rayos_new.jpg",
      alt: "Rayos X",
    },
    {
      src: "https://smel.ptp.it/wp-content/uploads/2022/12/laboratori.jpg",
      alt: "Laboratorio",
    },
  ];

  const [equipIndex, setEquipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEquipIndex((prev) => (prev + 1) % equipamientoImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="home-carousel">
          {instalacionesImages.map((img, index) => (
            <div
              key={index}
              className={`home-carousel-item ${
                index === instalIndex ? "active" : ""
              }`}
            >
              <img src={img.src} alt={img.alt} />
              <p>{img.caption}</p>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {instalacionesImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === instalIndex ? "active" : ""}`}
              onClick={() => setInstalIndex(index)}
            ></span>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2>Equipamiento del Sanatorio</h2>
        <div className="home-carousel">
          {equipamientoImages.map((img, index) => (
            <div
              key={index}
              className={`home-carousel-item ${
                index === equipIndex ? "active" : ""
              }`}
            >
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {equipamientoImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === equipIndex ? "active" : ""}`}
              onClick={() => setEquipIndex(index)}
            ></span>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;