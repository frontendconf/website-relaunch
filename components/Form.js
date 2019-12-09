import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
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
      body: JSON.stringify({
        fields: Object.fromEntries(formData)
      })
    });
    const data = await response.json();

    this.setState({
      message: data.message,
      isLoading: false
    });
  }

  render() {
    return this.state.message ? (
      <div>{this.state.message}</div>
    ) : (
      <form
        action={this.props.action}
        className="form"
        method={this.props.method}
        onSubmit={this.handleSubmit}
      >
        <dl>
          {this.props.fields.map((field, i) => {
            let element;

            switch (field.type) {
              case "select":
                element = (
                  <select name={field.name} id={field.name}>
                    {field.options.map((option, ii) => (
                      <option key={ii}>{option}</option>
                    ))}
                  </select>
                );
                break;
              case "textarea":
                element = <textarea name={field.name} id={field.name} />;
                break;
              default:
                element = (
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={field.value}
                  />
                );
            }
            return (
              <React.Fragment key={i}>
                <dt>
                  <label htmlFor={field.name}>{field.name}</label>
                </dt>
                <dd>{element}</dd>
              </React.Fragment>
            );
          })}
        </dl>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

Form.defaultProps = {
  fields: [],
  action: "",
  method: "POST"
};

export default Form;
