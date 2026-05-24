import "./Header.css"; // Importa o CSS local para manter o estilo do Header dentro da propria pasta.

function Header() {
  return (
    <header className="navbar">
      <a className="logo" href="/" aria-label="CityBank">City</a>
      <nav className="main-nav" aria-label="Menu principal">
        <a href="#citybank">CityBank</a>
        <a href="#city-black">City Black</a>
        <a href="#empresas">City Empresas</a>
        <a href="#seguranca">Seguranca</a>
        <a href="#sobre">Sobre</a>
      </nav>
      <div className="nav-actions">
        <a href="/login">Login</a>
        <a className="primary-pill" href="/cadastro">Abra sua conta</a>
      </div>
    </header>
  );
}

export default Header;
