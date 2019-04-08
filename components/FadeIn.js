import ScrollAnimation from 'react-animate-on-scroll';
import PropTypes from 'prop-types';

const FadeIn = ({ delay, children }) => (
  <ScrollAnimation animateIn="fadeInUp" duration={.7} delay={delay}>
    {children}
  </ScrollAnimation>
);

FadeIn.propTypes = {
  delay: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired
};

FadeIn.defaultProps = {
  delay: 0,
}

export default FadeIn;
