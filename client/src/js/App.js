import React, { Component } from 'react';
import '../styles/App.css';

import NavBar from './components/NavBar';
import FooterModule from './components/FooterModule';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <FooterModule />
      </div>
    );
  }
}

export default App;
