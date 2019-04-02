import React, { Component } from "react";
import shuffle from "array-shuffle";
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
        <h3>Jobs</h3>

        <ul className="jobs__items">
          {this.state.items.map((item, i) => (
            <li className="jobs__item" key={i}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <span className="jobs__item-title">{item.title}</span>
                <span className="jobs__item-company">{item.company}</span>
              </a>
            </li>
          ))}
        </ul>

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
      </div>
    );
  }
}

export default Jobs;
