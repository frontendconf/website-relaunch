import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <main>{this.props.children}</main>;
  }
}

export default App;
