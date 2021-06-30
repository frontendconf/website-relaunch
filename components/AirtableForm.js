import React, { Component } from "react";
import Form from "./Form";

class AirtableForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSuccess: false,
      message: null,
      fieldGroups: []
    };
  }

  async componentDidMount() {
    const response = await fetch(this.getUrl());
    const data = await response.json();

    this.setState({
      isLoading: false,
      isSuccess: response.status < 400,
      message: data.message,
      fieldGroups: data.fieldGroups
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
        ) : this.state.isSuccess ? (
          <Form fieldGroups={this.state.fieldGroups} action={this.getUrl()} />
        ) : (
          <strong>{this.state.message}</strong>
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
