import './RouteTransition.css';
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function RouteTransition({ children }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="route-transition">
      {children}
    </div>
  );
}

RouteTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouteTransition;
