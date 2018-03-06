import React, { Component } from 'react';
import { Input, Button, Icon, option } from 'react-materialize';
import '../../styles/component-styles/UserForm.css';

class TransactionForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      storeName: '',
      amount: '',
      category: '',
      date: '',
      opts: [],
      stores: [],
      status: ''
    }
  }
  componentWillMount(){
    var sentData = {
      method:'POST',
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }
    var arr = [];
    var arr2 = [];
    fetch('http://127.0.0.1:3001/getCategories', sentData)
      .then(response =>{return response.json();})
      .then(responseData => {
          
          console.log("Response Data");
          for(var i =0; i<responseData.length; i++){
            console.log(responseData[i].category);
            arr.push(responseData[i].category);
          }
          this.setState({opts: arr});
          //this.state.opts.map((cat)=><option key={cat} value={cat}>{cat}</option>);
      });

    fetch('http://127.0.0.1:3001/getStores', sentData)
      .then(response =>{return response.json();})
      .then(responseData => {
          
          console.log("Response Data");
          for(var i =0; i<responseData.length; i++){
            console.log(responseData[i].storeName);
            arr2.push(responseData[i].storeName);
          }
          this.setState({stores: arr2});
          //this.state.stores.map((cat)=><option key={cat} value={cat}>{cat}</option>);
      });
  }

  handleChange(event){
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(this.state);
  }

  handleTransaction(event){
    event.preventDefault();
    var form = JSON.stringify({
         storeName : event.target[0].value,
         amount : event.target[1].value,
         date : event.target[2].value,
         category : event.target[3].value
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
    fetch('http://127.0.0.1:3001/transactions', sentData)
      .then(response => { return response.json();})
      .then(responseData => {return responseData;})
      .then(data => {
          this.setState({"status" : data});
          if(this.state.status.status === "transaction success"){
            //console.log("checking if isFinished");
            this.props.isFinished("success");
            //console.log("returning to formController");
          } 
        }
      )
  }

  render() {
    return (
      <form onSubmit={this.handleTransaction.bind(this)}>
        <div className="inputForm">    
          <h3>Add a Transaction</h3>
          <Input label="Store Name" type="select" value={this.props.storeName} onChange={this.handleChange.bind(this)}>
          {this.state.stores.map((x)=><option key={x} value={x}>{x}</option>)}
          </Input>
          <Input label="Amount" type="text" value={this.props.amount} onChange={this.handleChange.bind(this)} />
          <Input label="Date" type="text" value={this.props.date} onChange={this.handleChange.bind(this)} />
          <Input label="Category" type="select" value={this.props.category} onChange={this.handleChange.bind(this)}> 
          {this.state.opts.map((x)=><option key={x} value={x}>{x}</option>)}
          </Input>
          <Button type="submit" waves='light'>Submit<Icon left>done</Icon></Button>
        </div>
      </form>
    );
  }
}

export default TransactionForm;
