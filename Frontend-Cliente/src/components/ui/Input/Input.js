import './Input.css';
import PropTypes from "prop-types";

function Input({ error, label, ...props }) {
  return (
    <label className="ui-field">
      <span>{label}</span>
      <input aria-invalid={Boolean(error)} {...props} />
      {error && <small>{error}</small>}
    </label>
  );
}

Input.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default Input;
