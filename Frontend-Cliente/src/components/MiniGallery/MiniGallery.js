import './MiniGallery.css';
import PropTypes from "prop-types";


function MiniGallery({ appCards }) {
  return (
    <section className="mini-gallery" aria-label="Mais recursos do app">
      <div className="app-gallery compact">
        {appCards.map((card) => (
          <article className="app-card" key={`compact-${card.text}`}>
            <img src={card.image} alt="" />
            <p>{card.text}</p>
            <a href="#app">Conheca o app City &gt;</a>
          </article>
        ))}
      </div>
    </section>
  );
}

MiniGallery.propTypes = {
  appCards: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MiniGallery;
