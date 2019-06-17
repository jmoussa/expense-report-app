import React, { Component } from 'react';
import { Input, Button, Icon } from 'react-materialize';
import '../../styles/component-styles/UserForm.css';

class MerchantForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      storeName: '',
      storeAddress: '',
      storePhone: '',
      city: '',
      zip: '',
      st: '',
      category: '',
      amount: '',
      date: '',
      productName: '',
      status: '',
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
      merchant: {
        store_name: event.target[0].value,
        store_address: event.target[1].value,
        store_phone : event.target[2].value,
        zipcode : event.target[4].value,
        city : event.target[3].value,
        state : event.target[5].value,
      },
      location: {
        city : event.target[3].value,
        zipcode : event.target[4].value,
        state : event.target[5].value,
      },
      category: {
        name: event.target[6].value
      },
      transaction: {
        amount: event.target[7].value,
        date: event.target[8].value
      },
      product: {
        name: event.target[9].value
      }
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
    fetch('http://127.0.0.1:3001/api/createAll', sentData).then(response => {
      return response.json()
    }).then(res=>{
      console.log(res)
      if(res){
        this.setState({'status':'success'})
        this.props.isFinished('success')
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.handleMerchant.bind(this)}>
        <div className="inputForm">    

          <br></br>
          <h6>Merchant Info</h6>
          <br></br>
          {/* Merchant */} 
          <Input label="Store Name" type="text" value={this.props.storeName} onChange={this.handleChange.bind(this)} />
          <Input label="Store Address" type="text" value={this.props.storeAddress} onChange={this.handleChange.bind(this)} />
          <Input label="Store Phone Number" type="text" value={this.props.storePhone} onChange={this.handleChange.bind(this)} />
          
          <br></br>
          <h6>Location Info</h6>
          <br></br>
          {/* Location */} 
          <div className="location"> 
            <Input label="City" type="text" value={this.props.city} onChange={this.handleChange.bind(this)} />
            <Input label="Zip Code" type="text" value={this.props.zip} onChange={this.handleChange.bind(this)} />
            <Input label="State" data-length={2} type="text" value={this.props.st} onChange={this.handleChange.bind(this)} />
          </div>

          <br></br>
          <h6>Category Info</h6>
          <br></br>
          {/* Category */} 
          <Input label="Merchant Department/Category" type="text" value={this.props.category} onChange={this.handleChange.bind(this)} />

          <br></br>
          <h6>Transaction Info</h6>
          <br></br>
          {/* Transaction */} 
          <Input label="Amount" type="text" value={this.props.amount} onChange={this.handleChange.bind(this)} />
          <Input label="Date" type="text" value={this.props.date} onChange={this.handleChange.bind(this)} />
          

          {/* Product */} 
          <Input label="Product Name" type="text" value={this.props.productName} onChange={this.handleChange.bind(this)} />
        
          <Button type="submit" waves='light'>Submit<Icon left>done</Icon></Button>
        </div>
      </form>
    )
  }
}

export default MerchantForm;
