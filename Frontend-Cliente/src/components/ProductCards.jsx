import PropTypes from "prop-types";


function ProductCards({ productCards }) {
  return (
    <section className="moments-section" id="citybank">
      <div className="section-heading centered">
        <h2>Para cada momento, um City diferente</h2>
        <p>Tenha controle total sobre sua vida financeira com solucoes pensadas para pessoas e empresas.</p>
      </div>
      <div className="moment-stack">
        {productCards.map((product, index) => (
          <article className={`moment-card moment-${index + 1}`} key={product.title}>
            <img src={product.image} alt={product.title} />
            <div>
              <h3>{product.title}</h3>
              <button type="button">Saiba mais</button>
            </div>
          </article>
        ))}
      </div>
      <div className="slider-dots" aria-hidden="true">
        <span className="active-dot" />
        <span />
        <span />
      </div>
    </section>
  );
}

ProductCards.propTypes = {
  productCards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductCards;

// Arquivo migrado para ./ProductCards/index.js. Pode ser removido.
