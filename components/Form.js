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
    const payload = [...formData.entries()].reduce((obj, [key, val]) => {
      obj[key] = val === "true" ? true : val;

      return obj;
    }, {});

    const response = await fetch(this.props.action, {
      method: this.props.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
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
          <div
            className={`form__message ${
              this.state.isSuccess ? "" : "form__message--error"
            }`}
            dangerouslySetInnerHTML={{
              __html: this.state.message
            }}
          />
        )}
        {this.state.isSuccess ? null : (
          <form
            action={this.props.action}
            method={this.props.method}
            onSubmit={this.handleSubmit}
          >
            {this.props.hiddenFields &&
              this.props.hiddenFields.map(field => (
                <input
                  type="hidden"
                  name={field.name}
                  value={field.value}
                  key={field.name}
                />
              ))}
            {this.props.fieldGroups.map((group, groupIndex) => (
              <fieldset key={groupIndex} disabled={this.state.isLoading}>
                <legend>{group.title}</legend>
                <p dangerouslySetInnerHTML={{ __html: group.description }} />
                <dl>
                  {group.fields.map((field, fieldIndex) => {
                    let element;
                    const description = `${
                      field.description ? `${field.description} ` : ""
                    }${
                      field.maxLength
                        ? `Max. ${field.maxLength} characters.`
                        : ""
                    }`;

                    switch (field.type) {
                      case "select":
                        element = (
                          <select
                            name={field.name}
                            id={field.name}
                            disabled={this.state.isLoading}
                            aria-describedby={
                              description ? `${field.name}-desc` : null
                            }
                            required={field.required}
                          >
                            {field.options.map((option, i) => (
                              <option key={i}>{option}</option>
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
                              description ? `${field.name}-desc` : null
                            }
                            required={field.required}
                            maxLength={field.maxLength}
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
                              description ? `${field.name}-desc` : null
                            }
                            checked={field.checked}
                            required={field.required}
                            maxLength={field.maxLength}
                          />
                        );
                    }
                    return (
                      <React.Fragment key={fieldIndex}>
                        <dt>
                          <label htmlFor={field.name}>
                            {field.label || field.name}
                            {field.required ? (
                              <span aria-label="required">*</span>
                            ) : null}
                          </label>
                        </dt>
                        <dd className={`form__field-element--${field.type}`}>
                          {element}
                          {description && (
                            <div
                              id={`${field.name}-desc`}
                              className="form__field-description"
                            >
                              {description}
                            </div>
                          )}
                        </dd>
                      </React.Fragment>
                    );
                  })}
                </dl>
              </fieldset>
            ))}
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

Form.defaultProps = {
  fieldGroups: [],
  action: "",
  method: "POST"
};

export default Form;
