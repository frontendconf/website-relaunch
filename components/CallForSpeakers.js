import React, { Component } from "react";
import Form from "./form";

class CallForSpeaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const configRequest = await fetch(this.props.url);
    const config = await configRequest.json();

    this.setState({
      fields: config.fields,
      isLoading: false
    });
  }

  render() {
    return (
      <div className="call-for-speakers">
        <h2 id="form">Form</h2>
        {this.state.isLoading ? (
          <strong>Loading form...</strong>
        ) : (
          <Form fields={this.state.fields} action={this.props.url} />
        )}
      </div>
    );
  }
}

CallForSpeaker.defaultProps = {
  url: "/api/airtable"
};

export default CallForSpeaker;
