import { Component } from "react";

// TODO: Distance should probably be some sort of responsive
const TRANSITION_DISTANCE = 600; // 600px
const TARGET_OPACITY = 0.6;

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 0,
      step: 1, // visible frame
      images: [], // stores all of the frames for quick access
      totalFrames: 90 // the number of images in the sequence of JPEG files (this could be calculated server-side by scanning the frames folder)
    };

    this.myRef = React.createRef();
  }

  changeFrame() {
    const thisStep = this.state.step; // calculate the frame number
    if (this.state.images.length > 0 && this.state.images[thisStep]) {
      // if the image exists in the array
      if (this.state.images[thisStep].complete) {
        // if the image is downloaded and ready
        if (
          this.myRef.current.getAttribute("src") !==
          this.state.images[thisStep].src
        ) {
          // save overhead...?
          this.myRef.current.setAttribute(
            "src",
            this.state.images[thisStep].src
          ); // change the source of our placeholder image
        }
      }
    }
  }

  getYOffset() {
    // get distance scrolled from the top
    let pageY;
    if (typeof window.pageYOffset == "number") {
      pageY = window.pageYOffset;
    } else {
      pageY = document.documentElement.scrollTop; // IE
    }
    return pageY;
  }

  pad(number, length) {
    // pad numbers with leading zeros for JPEG sequence file names
    let str = "" + number;
    while (str.length < length) {
      str = "0" + str;
    }
    return str;
  }

  animloop() {
    // the smoothest animation loop possible
    const step = Math.round(
      (this.getYOffset() / document.body.scrollHeight) * this.state.totalFrames
    );
    if (step !== this.state.step) {
      this.setState({ step });
    }
    this.changeFrame();
  }

  scrollHandler = () => {
    // Create new callstack to resolve into next frame (better performance)
    setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop;
      this.animloop();

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

    for (let i = 0; i < this.state.totalFrames; i++) {
      // loop for each image in sequence
      this.state.images[i] = new Image(); // add image object to array
      this.state.images[i].src =
        "/static/images/frames/hero-bg-" + this.pad(i, 5) + ".jpg"; // set the source of the image object
    }

    this.animloop();
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
        <img
          className="hero-bg__image"
          src="/static/images/frames/hero-bg-00000.jpg"
          alt=""
          ref={this.myRef}
        />
        <div
          className="hero-bg__overlay"
          style={{ opacity: this.state.opacity }}
        />
      </div>
    );
  }
}

export default Hero;
