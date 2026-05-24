import './CardSection.css';
function CardSection() {
  return (
    <section className="card-section" id="city-black">
      <div className="section-heading">
        <p>Cartoes City</p>
        <h2>Escolha o cartao que acompanha o seu momento.</h2>
        <span>
          Limite personalizado, cartao virtual para compras online e controle total pelo app.
        </span>
        <a className="primary-pill" href="#conta">Pedir meu cartao</a>
      </div>

      <div className="floating-cards" aria-label="Cartoes CityBank">
        <article className="credit-card credit-card-back">
          <strong>City Empresas</strong>
          <span className="chip" />
          <span>Business</span>
        </article>
        <article className="credit-card credit-card-front">
          <strong>City Black</strong>
          <span className="brand-circles" />
          <span>Black</span>
        </article>
      </div>
    </section>
  );
}

export default CardSection;
