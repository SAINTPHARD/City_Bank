import './Skeleton.css';
import PropTypes from "prop-types";

function Skeleton({ className = "" }) {
  return <span className={`skeleton ${className}`.trim()} aria-hidden="true" />;
}

Skeleton.propTypes = {
  className: PropTypes.string,
};

export default Skeleton;
