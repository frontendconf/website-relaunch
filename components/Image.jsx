import { Component } from 'react';
import PropTypes from 'prop-types'; // ES6

const emptyGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const ImagesArray = [];

const observerConfig = {
  rootMargin: `500px 0px 500px`,
  threshold: 0.01,
};

let instance;

const Observer = {
  get instance() {
    if (!instance) {
      instance = new IntersectionObserver(async (entries) => {
        const elements = entries.filter(entry => entry.intersectionRatio >= 0.01);
      
        if (elements.length) {
          elements.forEach((entry) => {
            // Initiate loading of the image
            ImagesArray.find((foo) => foo.node === entry.target).callback();

            // Check node inside ImagesArray
            Observer.instance.unobserve(entry.target);
          });
        }
      }, observerConfig);
    }
    return instance;
  }
}

class Image extends Component {
  /**
   * constructor
   * @param {Object} props
   * @return {Component}
   */
  constructor(props) {
    super(props);

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
      node: this.image,
      callback: () => {
        this.setState({
          src: this.props.src,
          srcSet: this.props.srcSet,
          loading: true,
        })
      }
    });

    // Observe image
    Observer.instance.observe(this.image);
  }

  componentWillUnmount() {
    // Observe image
    Observer.instance.unobserve(this.image);

    // Remove from cached array
    ImagesArray.splice(ImagesArray.findIndex((foo) => foo.node === this.image), 1);
  }

  onLoad() {
    this.setState({
      loading: false,
      loaded: true,
    })
  }

  /**
   * Renderfunction
   * @returns {JSX}
   */
  render() {
    return (
      <span className={`image ${this.props.className}`}>
        <span className="image__loader"></span>
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
              ref={(image) => { this.image = image; }}
              src={this.props.src}
              alt={this.props.alt}
              onLoad={this.onLoad}
            />
          </picture>
        ) : (
          <img
            className={`image__image ${this.state.loaded ? 'is-loaded' : ''}`}
            ref={(image) => { this.image = image; }}
            src={this.state.src}
            srcSet={this.state.srcSet}
            sizes={this.props.sizes}
            alt={this.props.alt}
            onLoad={this.onLoad}
          />
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
}

Image.defaultProps = {
  src: '',
  srcSet: '',
  sizes: '',
  alt: '',
}

export default Image;

