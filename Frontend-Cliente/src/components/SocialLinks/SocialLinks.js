import './SocialLinks.css';
import PropTypes from 'prop-types';

function SocialLinks({ socialLinks }) {
  return (
    <div className="socials" aria-label="Redes sociais">
      {socialLinks.map((social) => (
        <a href={social.href} key={social.label} aria-label={social.label}>
          <img src={social.image} alt="" />
        </a>
      ))}
    </div>
  );
}

SocialLinks.propTypes = {
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SocialLinks;
