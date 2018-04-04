import React, { Component } from 'react';
import { Input, Button, Icon } from 'react-materialize';
import '../../styles/component-styles/UserForm.css';

class MerchantForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      storeName: '',
      storeAddress: '',
      city: '',
      zip: '',
      st: '',
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
    
    //console.log("----NEW VALUES----");
    //console.log("City: ", event.target[2].value);
    //console.log("Zip: ", event.target[3].value);
    //console.log("State: ", event.target[4].value);

    var form = JSON.stringify({
         storeName : event.target[0].value,
         storeAddress : event.target[1].value,
         city : event.target[2].value,
         zip : event.target[3].value,
         st : event.target[4].value,
         storePhone : event.target[4].value
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
    fetch('http://127.0.0.1:3001/merchant', sentData)
      .then(response => { return response.json();})
      .then(responseData => {return responseData;})
      .then(data => {
          this.setState({"status" : data});
          if(this.state.status.status === "merchant success"){
            this.props.isFinished("success");
          } 
        }
      )
      
  }

  render() {
    return (
      <form onSubmit={this.handleMerchant.bind(this)}>
        <div className="inputForm">    
          <h3>Add a Merchant</h3>
          <Input label="Store Name" type="text" value={this.props.storeName} onChange={this.handleChange.bind(this)} />
          <Input label="Store Address" type="text" value={this.props.storeAddress} onChange={this.handleChange.bind(this)} />
          <div className="location"> 
            <Input label="City" type="text" value={this.props.city} onChange={this.handleChange.bind(this)} />
            <Input label="Zip Code" type="text" value={this.props.zip} onChange={this.handleChange.bind(this)} />
            <Input label="State" type="text" value={this.props.st} onChange={this.handleChange.bind(this)} />
          </div>
          <Input label="Store Phone Number" type="text" value={this.props.storePhone} onChange={this.handleChange.bind(this)} />
          <Button type="submit" waves='light'>Submit<Icon left>done</Icon></Button>
        </div>
      </form>
    );
  }
}

export default MerchantForm;
