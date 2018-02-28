import React, { Component } from 'react';
import { Input, Button, Icon } from 'react-materialize';
import '../../styles/component-styles/UserForm.css';
import CategoryForm from './CategoryForm.js';

var merchantSuccess = 0;
class MerchantForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      storeName: '',
      storeAddress: '',
      storePhone: '',
      status: ''
    }
  }
  
  handleChange(event){
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(this.state);
  }

  handleMerchant(event){
    event.preventDefault();
    var form = JSON.stringify({
         storeName : event.target[0].value,
         storeAddress : event.target[1].value,
         storePhone : event.target[2].value
    });
    var sentData = {
      method:'POST',
      mode: 'cors',
      body: form,
      headers: {
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }
    fetch('http://127.0.0.1:3001/', sentData)
      .then(response => { return response.json();})
      .then(responseData => {console.log(responseData); return responseData;})
      .then(data => {this.setState({"status" : data});console.log(this.state.status.status);}); 
    
    merchantSuccess = 1;
  }
  render() {
    let route = null;
    if(merchantSuccess === 1){
        route = <CategoryForm />;
    }
      
    return (
    <div>  
      <form onSubmit={this.handleMerchant.bind(this)}>
        <div className="inputForm">    
          <h3>Add a Merchant</h3>
		      <Input label="Store Name" type="text" value={this.props.storeName} onChange={this.handleChange.bind(this)} />
		      <Input label="Store Address" type="text" value={this.props.storeAddress} onChange={this.handleChange.bind(this)} />
		      <Input label="Store Phone Number" type="text" value={this.props.storePhone} onChange={this.handleChange.bind(this)} />
          <Button type="submit" waves='light'>Submit<Icon left>done</Icon></Button>
        </div>
      </form>
      {route}
    </div>  
    );
  }
}

export default MerchantForm;
