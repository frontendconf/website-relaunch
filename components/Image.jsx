import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6

const emptyGif =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const ImagesArray = [];

const observerConfig = {
  rootMargin: `500px 0px 500px`,
  threshold: 0.01
};

let instance;

const Observer = {
  get instance() {
    if (!instance) {
      instance = new IntersectionObserver(async entries => {
        const elements = entries.filter(
          entry => entry.intersectionRatio >= 0.01
        );

        if (elements.length) {
          elements.forEach(entry => {
            // Initiate loading of the image
            ImagesArray.find(foo => foo.node === entry.target).callback();

            // Check node inside ImagesArray
            Observer.instance.unobserve(entry.target);
          });
        }
      }, observerConfig);
    }
    return instance;
  }
};

class Image extends Component {
  /**
   * constructor
   * @param {Object} props
   * @return {Component}
   */
  constructor(props) {
    super(props);

    this.image = React.createRef();

    this.state = {
      loading: false,
      loaded: false,
      src: emptyGif,
      srcSet: `${emptyGif} 1w`
    };

    this.onLoad = this.onLoad.bind(this);
  }

  /**
   * componentDidMount
   * @return {undefined}
   */
  componentDidMount() {
    // Add custom callback
    ImagesArray.push({
      node: this.image.current,
      callback: () => {
        this.setState({
          src: this.props.src,
          srcSet: this.props.srcSet,
          loading: true
        });
      }
    });

    // Observe image
    Observer.instance.observe(this.image.current);
  }

  componentWillUnmount() {
    // Observe image
    Observer.instance.unobserve(this.image.current);

    // Remove from cached array
    ImagesArray.splice(
      ImagesArray.findIndex(foo => foo.node === this.image.current),
      1
    );
  }

  onLoad() {
    this.setState({
      loading: false,
      loaded: true
    });

    // Provides hook for parent component
    this.props.onLoad();
  }

  /**
   * Renderfunction
   * @returns {JSX}
   */
  render() {
    return (
      <span className={`image ${this.props.className || ""}`}>
        <span className="image__loader" />
        {this.props.picture ? (
          <picture>
            {this.props.sources.map(source => (
              <source
                srcSet={source.srcset}
                data-srcset={source.dataSrcset || false}
                type={source.type || false}
                media={source.media || false}
                sizes={source.sizes || false}
              />
            ))}
            <img
              className={`image__image`}
              ref={this.image}
              src={this.props.src}
              alt={this.props.alt}
              onLoad={this.onLoad}
            />
          </picture>
        ) : (
          <>
            <img
              className={`image__image${
                this.state.loaded ? " is-loaded" : ""
              } js-only`}
              ref={this.image}
              src={this.state.src}
              srcSet={this.state.srcSet}
              sizes={this.props.sizes}
              alt={this.props.alt}
              onLoad={this.onLoad}
            />
            <noscript>
              <img
                className="image__image is-loaded"
                src={this.props.src}
                srcSet={this.props.srcSet}
                sizes={this.props.sizes}
                alt={this.props.alt}
              />
            </noscript>
          </>
        )}
      </span>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  alt: PropTypes.string,
  onLoad: PropTypes.func
};

Image.defaultProps = {
  alt: "",
  onLoad: function() {}
};

export default Image;
