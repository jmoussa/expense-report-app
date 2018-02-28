import React, { Component } from 'react';
import MerchantForm from '../components/MerchantForm.js';
import "../../styles/page-styles/Input.css";

class Input extends Component {
  render() {
    return (
      <div className="Inputs">
        <h2>Input Merchant and Transaction Information</h2>
        <p>Limited to one transaction per merchant (no duplicate merchants)</p>
        <MerchantForm />
      </div>
    );
  }
}

export default Input;
