import React, { Component } from 'react';
import { Spinner } from '@blueprintjs/core';
import { QRCode } from 'react-qr-svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      spinnerValue: 0.0,
      randomCode: this.generateRamdomCode(),
    };
  }

  componentDidMount() {
    setInterval(this.updateTimer.bind(this), 100);
  }

  authenticated() {
    this.setState({
      authenticated: true
    })
  }

  unauthenticated() {
    this.setState({
      authenticated: false
    })
  }

  generateRamdomCode() {
    return Math.floor(Math.random() * 1000000).toString();
  }

  updateTimer() {
    if (this.state.spinnerValue < 1.0) {
      this.setState({
        spinnerValue: this.state.spinnerValue + 0.01,
      });
    } else {
      this.setState({
        spinnerValue: 0.0,
        randomCode: this.generateRamdomCode(),
      })
    }
  }

  authenticatedScreen() {
    return (
      <div>
        <h1>Authenticated!</h1>
        <p>(the main app screen would be here)</p>
        <a href="javascript:;" onClick={() => this.unauthenticated()}>Reset</a>
      </div>
    )
  }

  unauthenticatedScreen() {
    return (
      <div>
        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          style={{ width: 200 }}
          value={this.state.randomCode}
          onClick={() => this.authenticated()}
        />
        <h1>{this.state.randomCode}</h1>
        <Spinner size='small' value={this.state.spinnerValue} intent='danger' />
        <p>Scan or enter code using the app!</p>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {this.state.authenticated && this.authenticatedScreen()}
        {!this.state.authenticated && this.unauthenticatedScreen()}
      </div>
    );
  }
}

export default App;
