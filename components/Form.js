import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSuccess: false,
      message: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({
      isLoading: true
    });

    const formData = new FormData(event.target);

    const response = await fetch(this.props.action, {
      method: this.props.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    const data = await response.json();

    this.setState({
      message: data.message,
      isSuccess: response.status < 400,
      isLoading: false
    });
  }

  render() {
    return (
      <div className="form">
        {this.state.message && (
          <div className="form__message">{this.state.message}</div>
        )}
        {this.state.isSuccess ? null : (
          <form
            action={this.props.action}
            method={this.props.method}
            onSubmit={this.handleSubmit}
          >
            <dl>
              {this.props.fields.map((field, i) => {
                let element;

                switch (field.type) {
                  case "select":
                    element = (
                      <select
                        name={field.name}
                        id={field.name}
                        disabled={this.state.isLoading}
                        aria-describedby={
                          field.description ? `${field.name}-desc` : null
                        }
                      >
                        {field.options.map((option, ii) => (
                          <option key={ii}>{option}</option>
                        ))}
                      </select>
                    );
                    break;
                  case "textarea":
                    element = (
                      <textarea
                        name={field.name}
                        id={field.name}
                        disabled={this.state.isLoading}
                        aria-describedby={
                          field.description ? `${field.name}-desc` : null
                        }
                      />
                    );
                    break;
                  default:
                    element = (
                      <input
                        type={field.type === "file" ? "text" : field.type}
                        name={field.name}
                        id={field.name}
                        value={field.value}
                        disabled={this.state.isLoading}
                        aria-describedby={
                          field.description ? `${field.name}-desc` : null
                        }
                      />
                    );
                }
                return (
                  <React.Fragment key={i}>
                    <dt>
                      <label htmlFor={field.name}>{field.name}</label>
                    </dt>
                    <dd>
                      {element}
                      {field.description && (
                        <div id={`${field.name}-desc`}>{field.description}</div>
                      )}
                    </dd>
                  </React.Fragment>
                );
              })}
            </dl>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

Form.defaultProps = {
  fields: [],
  action: "",
  method: "POST"
};

export default Form;
