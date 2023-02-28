import React, { Component } from "react";
// import Parallax from "parallax-js";

// TODO: Distance should probably be some sort of responsive
const TRANSITION_DISTANCE = 600; // 600px
const TARGET_OPACITY = 0.4;
const TARGET_BLUR = 25;

class Hero extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();

    this.state = {
      opacity: 0,
      videoOpacity: 0,
      blur: 0
    };
  }

  scrollHandler = () => {
    // Create new callstack to resolve into next frame (better performance)
    setTimeout(() => {
      // Cross browser scroll position fetching
      const el = document.scrollingElement || document.documentElement;
      const scrollTop = el.scrollTop;

      if (this.props.isHome) {
        if (scrollTop < TRANSITION_DISTANCE) {
          this.videoRef.current.setAttribute("muted", "");
          this.videoRef.current.playsInline = true;
          this.videoRef.current.play();
        } else {
          this.videoRef.current.pause();
        }
      }

      if (scrollTop < TRANSITION_DISTANCE) {
        this.setState({
          opacity:
            (1 / (TRANSITION_DISTANCE / TARGET_OPACITY)) * scrollTop + 0.3
        });
        this.setState({
          blur: (1 / (TRANSITION_DISTANCE / TARGET_BLUR)) * scrollTop
        });
      } else if (this.state.opacity < TARGET_OPACITY) {
        this.setState({
          opacity: TARGET_OPACITY
        });
        this.setState({
          blur: TARGET_BLUR
        });
      }
    }, 0);
  };

  componentDidMount() {
    window.addEventListener("scroll", this.scrollHandler, {
      passive: true
    });

    if (this.props.isHome) {
      this.videoRef.current.addEventListener("loadeddata", () => {
        if (this.videoRef.current.readyState >= 3) {
          this.setState({
            videoOpacity: 1
          });
        }
      });
    }

    // const scene = document.querySelector(".scene");
    // this.parallaxInstance = new Parallax(scene);

    // First trigger before scroll event happened
    this.scrollHandler();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
    // this.parallaxInstance.destroy();
  }

  render() {
    return (
      <div className="scene">
        <div
          data-depth="0.2"
          className={`hero-bg ${
            this.props.template ? `hero-bg--${this.props.template}` : ""
          }`}
        >
          <div className="hero-bg__image-wrapper" style={{ height: "100%" }}>
            {this.props.isHome && (
              <video
                ref={this.videoRef}
                width="100%"
                height="100%"
                loop
                autoPlay
                muted
                playsInline
                style={{
                  position: "relative",
                  zIndex: 1,
                  objectFit: "cover",
                  filter: `blur(${this.state.blur}px)`,
                  opacity: this.state.videoOpacity
                }}
              >
                <source src="/static/bg_vid.mp4" type="video/mp4" />
                <source src="/static/bg_vid.webm" type="video/webm" />
              </video>
            )}
            {!this.props.isHome && (
              <img
                className="hero-bg__image hero-bg__image-desktop"
                src={
                  this.props.backgroundImageDesktop
                    ? this.props.backgroundImageDesktop.url
                    : "/static/images/bg_desktop.jpg"
                }
                style={{
                  filter: `blur(${this.state.blur / 4}px)`
                }}
              />
            )}
            {!this.props.isHome && (
              <img
                className="hero-bg__image hero-bg__image-mobile"
                src={
                  this.props.backgroundImageMobile
                    ? this.props.backgroundImageMobile.url
                    : "/static/images/bg_mobile.jpg"
                }
              />
            )}
          </div>
          <div
            className="hero-bg__overlay"
            style={{ opacity: this.state.opacity }}
          />
        </div>
      </div>
    );
  }
}

export default Hero;
