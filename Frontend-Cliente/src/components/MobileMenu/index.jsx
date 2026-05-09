import { useState } from 'react';
import './styles.css';

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Abrir menu">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
      <nav className={`mobile-nav${open ? ' open' : ''}`} aria-label="Menu mobile">
        <a href="#citybank" onClick={() => setOpen(false)}>CityBank</a>
        <a href="#city-black" onClick={() => setOpen(false)}>City Black</a>
        <a href="#empresas" onClick={() => setOpen(false)}>City Empresas</a>
        <a href="#seguranca" onClick={() => setOpen(false)}>Seguranca</a>
        <a href="#sobre" onClick={() => setOpen(false)}>Sobre o City</a>
        <a href="/login" onClick={() => setOpen(false)}>Login</a>
        <a className="primary-pill" href="#conta" onClick={() => setOpen(false)}>Abra sua conta</a>
      </nav>
      {open && <div className="backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}

export default MobileMenu;
