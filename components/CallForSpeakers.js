import React, { Component } from "react";
import Form from "./Form";

class CallForSpeaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldGroups: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const configRequest = await fetch(this.props.url);
    const config = await configRequest.json();

    this.setState({
      fieldGroups: config.fieldGroups,
      isLoading: false
    });
  }

  render() {
    return (
      <div className="call-for-speakers">
        <h2 id="form">Submit proposal</h2>
        {this.state.isLoading ? (
          <strong>Loading form...</strong>
        ) : (
          <Form fieldGroups={this.state.fieldGroups} action={this.props.url} />
        )}
      </div>
    );
  }
}

CallForSpeaker.defaultProps = {
  url: "/api/airtable"
};

export default CallForSpeaker;
