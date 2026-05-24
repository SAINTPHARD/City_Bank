import './Hero.css';
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cpf = formData.get("cpf")?.toString().trim() || "";
    navigate(`/cadastro${cpf ? `?cpf=${encodeURIComponent(cpf)}` : ""}`);
  };

  return (
    <section className="hero" id="conta">
      <div className="hero-copy">
        <p>Conta digital, cartao e investimentos em um so lugar</p>
        <h1>CityBank para cuidar melhor do seu dinheiro.</h1>
        <span>Atendimento simples, app completo e seguranca para sua rotina financeira.</span>
      </div>

      <form className="cpf-card" onSubmit={handleSubmit}>
        <label htmlFor="cpf">Abra sua conta CityBank em poucos minutos</label>
        <input id="cpf" name="cpf" type="text" placeholder="Digite seu CPF" />
        <button type="submit">Continuar &gt;</button>
      </form>
    </section>
  );
}

export default Hero;
