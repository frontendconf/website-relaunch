import ScrollAnimation from "react-animate-on-scroll";
import PropTypes from "prop-types";

const FadeIn = ({ delay, children, style }) => {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion)").matches;

  return (
    <ScrollAnimation
      animateIn="fadeInUp"
      duration={0.7}
      delay={reducedMotion ? 0 : delay}
      style={style}
      offset={100}
      animateOnce={true}
      initiallyVisible={!!reducedMotion}
    >
      {children}
    </ScrollAnimation>
  );
};

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
