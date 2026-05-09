import PropTypes from "prop-types";


function AppGallery({ appCards }) {
  return (
    <section className="app-section" id="empresas">
      <div className="section-heading">
        <h2>Um app para tudo. E tudo no app</h2>
      </div>
      <div className="app-gallery">
        {appCards.map((card) => (
          <article className="app-card" key={card.text}>
            <img src={card.image} alt="" />
            <p>{card.text}</p>
            <a href="#app">Conheca o app City &gt;</a>
          </article>
        ))}
      </div>
    </section>
  );
}

AppGallery.propTypes = {
  appCards: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AppGallery;

// Arquivo migrado para ./AppGallery/index.js. Pode ser removido.