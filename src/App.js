import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './Components/SignIn';

class App extends Component {
  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Fuud</h2>
          <SignIn/>
        </div>
        
      </div>
    );
  }
}

export default App;