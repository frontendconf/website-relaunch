import ScrollAnimation from "react-animate-on-scroll";
import PropTypes from "prop-types";

const FadeIn = ({ delay, children, style }) => (
  <ScrollAnimation
    animateIn="fadeInUp"
    duration={0.7}
    delay={delay}
    style={style}
    offset={100}
  >
    {children}
  </ScrollAnimation>
);

FadeIn.propTypes = {
  delay: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  style: PropTypes.object
};

FadeIn.defaultProps = {
  delay: 0,
  style: {}
};

export default FadeIn;
