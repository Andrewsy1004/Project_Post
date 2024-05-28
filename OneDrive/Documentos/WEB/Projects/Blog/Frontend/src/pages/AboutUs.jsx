import "../styles/aboutUs.css";

export const AboutUs = () => {
  return (
    <div className="about-us py-2">
      <div className="container">
      <h1 className="text-center mb-4 typing-effect">Acerca de Nosotros</h1>
        <div className="row">
          <div className="col-md-6">
            <img src="https://media.istockphoto.com/id/1294477039/vector/metaphor-bipolar-disorder-mind-mental-double-face-split-personality-concept-mood-disorder-2.jpg?s=612x612&w=0&k=20&c=JtBxyFapXIA63hzZk_F5WNDF92J8fD2gIFNX3Ta4U3A=" alt="Salud Mental" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <p>
              Somos un grupo de estudiantes de la Universidad Libre Seccional Barranquilla,
              motivados por mejorar el entendimiento y apoyo en torno a la salud mental en nuestra región.
            </p>
            <p>
              Observando el incremento en los casos de problemas de salud mental y suicidios en Barranquilla,
              decidimos crear esta plataforma donde expertos en psicología o personas que tengan conocimientos en el tema pueden compartir sus conocimientos
              a través de artículos y publicaciones. Nuestro objetivo es que la comunidad no solo obtenga información,
              sino que también participe activamente, compartiendo experiencias y encontrando apoyo mutuo.
            </p>
            <p>
              Creemos firmemente en la educación y la comunicación abierta como herramientas clave para desmantelar el estigma
              que rodea a los temas de salud mental. Invitamos a todos a explorar, aprender y contribuir en nuestro espacio dedicado
              a la salud mental.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
