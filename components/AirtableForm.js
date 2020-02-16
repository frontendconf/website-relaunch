import React, { Component } from "react";
import Form from "./Form";

class AirtableForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldGroups: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    console.log(this.getUrl());
    const configRequest = await fetch(this.getUrl());
    const config = await configRequest.json();

    this.setState({
      fieldGroups: config.fieldGroups,
      isLoading: false
    });
  }

  getUrl() {
    return `${this.props.url}?table=${encodeURIComponent(this.props.table)}`;
  }

  render() {
    return (
      <div className="">
        <h2 id="form">{this.props.title}</h2>
        {this.state.isLoading ? (
          <strong>Loading form...</strong>
        ) : (
          <Form fieldGroups={this.state.fieldGroups} action={this.getUrl()} />
        )}
      </div>
    );
  }
}

AirtableForm.defaultProps = {
  url: "/api/airtable",
  title: "",
  table: "Call for Speakers"
};

export default AirtableForm;
