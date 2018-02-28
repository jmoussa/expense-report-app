import React, { Component } from 'react';
import { Input, Button, Icon } from 'react-materialize';
import '../../styles/component-styles/UserForm.css';

class CategoryForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      category:'',
      status: ''
    }
  }
  
  handleChange(event){
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(this.state);
  }

  handleCategory(event){
    event.preventDefault();
    var form = JSON.stringify({
         category : event.target[0].value
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
    fetch('http://127.0.0.1:3001/categories', sentData)
      .then(response => { return response.json();})
      .then(responseData => {console.log(responseData); return responseData;})
      .then(data => {this.setState({"status" : data});console.log(this.state.status.status);}); 
    
  }


  render() {
    return (
      <form onSubmit={this.handleCategory.bind(this)}>
        <h3>Add a Category</h3>
        <div className="inputForm">
		      <Input label="Merchant Department/Category" type="text" value={this.props.category} onChange={this.handleChange.bind(this)} />
          <Button type="submit" waves='light'>Submit<Icon left>done</Icon></Button>
        </div>
      </form>
    );
  }
}

export default CategoryForm;
