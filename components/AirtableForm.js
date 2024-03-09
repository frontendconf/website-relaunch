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
      fieldGroups: data.fieldGroups,
      hiddenFields: data.hiddenFields
    });
  }

  getUrl() {
    return `${this.props.url}?id=${encodeURIComponent(this.props.id)}`;
  }

  render() {
    return (
      <div className="">
        <h2 id="form">{this.props.title}</h2>
        <br />
        {this.state.isLoading ? (
          <strong>Loading form...</strong>
        ) : this.state.isSuccess ? (
          <Form
            fieldGroups={this.state.fieldGroups}
            hiddenFields={this.state.hiddenFields}
            action={this.getUrl()}
          />
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
  id: ""
};

export default AirtableForm;
