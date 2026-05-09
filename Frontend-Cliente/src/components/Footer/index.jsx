import './styles.css';
import PropTypes from 'prop-types';
import SocialLinks from '../SocialLinks/index.jsx';

function Footer({ footerColumns, socialLinks }) {
  return (
    <footer className="footer" id="sobre">
      <div className="footer-grid">
        {footerColumns.map((column) => (
          <nav aria-label={column[0]} key={column[0]}>
            {column.map((item, index) =>
              index === 0 ? (
                <h3 key={item}>{item}</h3>
              ) : (
                <a href="#footer" key={item}>{item}</a>
              )
            )}
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <strong className="footer-logo">City</strong>
        <p>(c) 2026 CityBank Pagamentos S.A. Instituicao de Pagamento.</p>
        <SocialLinks socialLinks={socialLinks} />
      </div>
    </footer>
  );
}

Footer.propTypes = {
  footerColumns: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Footer;
