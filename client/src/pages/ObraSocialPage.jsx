import React from "react";
import Slider from "react-slick";
import "../components/styles/obrasSociales.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaWhatsapp } from "react-icons/fa";

function ObrasSociales() {
  const obras = [
    { nombre: "PAMI", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/PAMI-Logo.svg/1200px-PAMI-Logo.svg.png" },
    { nombre: "Federada Salud", img: "https://infonegocios.info/content/companies/logos/2hYeqIW9PxfBC1ATX1EZlr0UOW6Lt72tdK1m4On5.png" },
    { nombre: "Alianza Médica", img: "https://circulomedicobv.com.ar/wp/wp-content/uploads/2021/06/60894df7bea5a.png" },
    { nombre: "Previnca", img: "https://agpjmr.org.ar/wp-content/uploads/2021/08/PREVSalETIQUETA-.jpg" },
    { nombre: "OSDE", img: "https://upload.wikimedia.org/wikipedia/commons/1/18/Logo_OSDE_2020.png" },
    { nombre: "OSCEARA", img: "https://play-lh.googleusercontent.com/P8Bdde6Hmd8JgzcvHR5kkqFYwmlmxW2Z3cpxwC0FcXwVFXWSbvHTOpQP7OTvRCQFOw" },
    { nombre: "IAPOS", img: "https://www.santafe.gob.ar/ms/iapos-old/wp-content/uploads/sites/26/2020/01/iapos-logos-finales-02.png" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="obras-container">
      <h2 className="titulo-obras">NUESTRAS OBRAS SOCIALES AFILIADAS</h2>
      <Slider {...settings}>
        {obras.map((obra, index) => (
          <div key={index} className="obra-slide">
            <img src={obra.img} alt={obra.nombre} className="obra-img" />
            <p>{obra.nombre}</p>
          </div>
        ))}
      </Slider>
      <section className="info-obras">
        <h3>Atención con Cobertura</h3>
        <p>
          En nuestro sanatorio trabajamos con una amplia red de obras sociales
          y prepagas, garantizando que nuestros pacientes puedan acceder a
          servicios de salud de calidad sin preocupaciones.
        </p>
        <p>
          Si tu obra social no figura en la lista, contactanos y te
          asesoraremos para encontrar la mejor opción de cobertura.
        </p>
      </section>

      <section className="contacto-obras">
        <h3>¿Tenés dudas sobre tu cobertura?</h3>
        <p>Comunicate con nuestro equipo de atención al paciente.</p>
        <button
            className="btn-contacto"
            onClick={() =>
            window.open("https://wa.me/549xxxxxxxxx", "_blank")
            }
        >
            <FaWhatsapp style={{ marginRight: "8px" }} />
            Contactanos por WhatsApp
        </button>
      </section>

    </div>

  );
}

export default ObrasSociales;