import React, { Component } from "react";

class Newsletter extends Component {
  constructor(props) {
    super(props);

    // TODO form stuff
    this.state = {
    };

    // Binding to this
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("submitting form");
  }

  render() {
    return (
      <div className={`newsletter ${this.props.className}`}>
        <h3>Sign up for the newsletter</h3>
      
        {/* TODO. make accessible */}
        <form className="newsletter__form" onSubmit={this.onSubmit}>
          <input className="newsletter__input" name="" placeholder="Email" />
          <button className="newsletter__submit">Go</button>
        </form>
      </div>
    );
  }
}

export default Newsletter;