import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Input from '../pages/Input';
import Output from '../pages/Output';
import '../../styles/component-styles/NavBar.css';
import { Navbar } from 'react-materialize';

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar brand='Expense Report' left className="navbar">
          <li><Link to="/">Input</Link></li>
          <li><Link to="/output">Output</Link></li>
        </Navbar>
        <div>
          <Route exact path="/" component={Input}/>
          <Route exact path="/output" component={Output}/>
        </div>
      </div>
    );
  }
}

export default NavBar;
