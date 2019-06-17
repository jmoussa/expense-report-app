import React, { Component } from 'react';
import FormController from '../components/FormController.js';
import "../../styles/page-styles/Input.css";

class Input extends Component {
  render() {
    return (
      <div className="Inputs">
        <h3>Input Transaction Information</h3>
        <FormController />
      </div>
    );
  }
}

export default Input;
