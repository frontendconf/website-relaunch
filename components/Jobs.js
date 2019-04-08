import React, { Component } from "react";
import shuffle from "array-shuffle";
// import ScrollAnimation from 'react-animate-on-scroll';
import { Row, Col } from "./shared/Grid";
import FadeIn from './FadeIn';
import Logo from "../static/freshjobs.svg";

class Jobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  getEntries() {
    return fetch("https://api.frontendconf.ch/freshjobs/entries").then(function(
      response
    ) {
      if (response.status >= 400) {
        return response.json().then(function(err) {
          throw new Error(err.message);
        });
      }

      return response.json();
    });
  }

  componentDidMount() {
    this.getEntries().then(items => {
      let results = shuffle(items);

      if (!this.props.isDetailed) {
        results = results.slice(0, 5);
      }

      this.setState({
        items: results
      });
    });
  }

  render() {
    return (
      <div className="jobs">
        <FadeIn>
          <h3 className="jobs__title">Jobs</h3>
        </FadeIn>
        <Row>
          {this.state.items.map((item, i) => (
            <Col className="jobs__col xs-12 rg-6 lg-4" key={item.link}>
              <FadeIn delay={150 * i}>
                <a className="jobs__link" href={item.link} target="_blank" rel="noopener noreferrer">
                  <span className="jobs__link-title">{item.title}</span>
                  <span className="jobs__link-company">{item.company}</span>
                </a>
              </FadeIn>
            </Col>
          ))}
        </Row>

        <FadeIn>
          <p className="jobs__source">
            <span>Powered by our friends from </span>
            <a
              href="https://freshjobs.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="jobs__source-link"
            >
              <Logo />
            </a>
          </p>
        </FadeIn>
      </div>
    );
  }
}

export default Jobs;
