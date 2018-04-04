import React, { Component } from 'react';
import { Input, Button, Icon } from 'react-materialize';
import '../../styles/component-styles/UserForm.css';

class ProductForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: '',
      productName: '',
      redirect: false
    }
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }
  
  redirect(event){
    this.setState({redirect: true});
  }

  handleProduct(event){
    event.preventDefault();
    //console.log("--------------PRODUCTS FORM--------------");

    var form = JSON.stringify({
         productName : event.target[0].value
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
    fetch('http://127.0.0.1:3001/products', sentData)
      .then(response => { return response.json();})
      .then(responseData => {return responseData;})
      .then(data => {
        this.setState({"status" : data});
        if(this.state.redirect === true){
          this.props.redirect("success");
        }else if(this.state.status.status === "product success"){
          this.props.isFinished("success");
        }
        
      }); 
  }

  
  render() {
    return (
      <form onSubmit={this.handleProduct.bind(this)}>
        <h3>Add a Product </h3>
        <div className="inputForm">
          <Input label="Product Name" type="text" value={this.props.productName} onChange={this.handleChange.bind(this)} />
          <Button type="submit" waves='light'>Submit<Icon left>done</Icon></Button>
          <Button waves='light' onClick={this.redirect.bind(this)}>Return to Start</Button>
        </div>
      </form>
    );
  }
}

export default ProductForm;
