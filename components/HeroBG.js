import React, { Component } from "react";

// TODO: Distance should probably be some sort of responsive
const TRANSITION_DISTANCE = 600; // 600px
const PARALLAX_DISTANCE = 100;
const TARGET_OPACITY = 0.6;

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 0,
      parallaxTop: 0
    };

    this.myRef = React.createRef();
  }

  scrollHandler = () => {
    // Create new callstack to resolve into next frame (better performance)
    setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop;

      this.setState({
        parallaxTop:
          (PARALLAX_DISTANCE / document.body.scrollHeight) * scrollTop
      });

      if (scrollTop < TRANSITION_DISTANCE) {
        this.setState({
          opacity: (1 / (TRANSITION_DISTANCE / TARGET_OPACITY)) * scrollTop
        });
      } else if (this.state.opacity < TARGET_OPACITY) {
        this.setState({
          opacity: TARGET_OPACITY
        });
      }
    }, 0);
  };

  componentDidMount() {
    window.addEventListener("scroll", this.scrollHandler, {
      passive: true
    });

    // First trigger before scroll event happened
    this.scrollHandler();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  render() {
    return (
      <div
        className={`hero-bg ${
          this.props.template ? `hero-bg--${this.props.template}` : ""
        }`}
        style={{
          bottom: -PARALLAX_DISTANCE + "px",
          transform: `translateY(-${this.state.parallaxTop}px)`
        }}
      >
        <div
          className="hero-bg__overlay"
          style={{ opacity: this.state.opacity }}
        />
      </div>
    );
  }
}

export default Hero;
