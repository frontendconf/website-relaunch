import React, { Component } from "react";

// TODO: Distance should probably be some sort of responsive
const TRANSITION_DISTANCE = 600; // 600px
const TARGET_OPACITY = 0.6;

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 0
    };

    this.myRef = React.createRef();
  }

  scrollHandler = () => {
    // Create new callstack to resolve into next frame (better performance)
    setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop;

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
      >
        <video
          className="hero-bg__image"
          autoPlay
          muted
          width="100%"
          ref={this.myRef}
        >
          <source type="video/mp4" src="/static/vortex.mp4" />
          <p>Sorry, your browser does not support the &lt;video&gt; element.</p>
        </video>
        <div
          className="hero-bg__overlay"
          style={{ opacity: this.state.opacity }}
        />
      </div>
    );
  }
}

export default Hero;
