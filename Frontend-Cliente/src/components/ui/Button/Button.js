import './Button.css';
import PropTypes from "prop-types";

function Button({ children, className = "", icon: Icon, variant = "primary", ...props }) {
  return (
    <button className={`ui-button ui-button--${variant} ${className}`.trim()} {...props}>
      {Icon && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.elementType,
  variant: PropTypes.oneOf(["primary", "secondary", "ghost", "danger"]),
};

export default Button;
