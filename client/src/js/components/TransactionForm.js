import React, { Component } from 'react';
import { Input, Button, Icon, DatePicker, option } from 'react-materialize';
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
          
          //console.log("Response Data");
          for(var i =0; i<responseData.length; i++){
            //console.log(responseData[i].category);
            arr.push(responseData[i].category);
          }
          this.setState({opts: arr});
      });

    fetch('http://127.0.0.1:3001/getStores', sentData)
      .then(response =>{return response.json();})
      .then(responseData => {
          
          //console.log("Response Data");
          for(var i =0; i<responseData.length; i++){
            //console.log(responseData[i].storeName);
            arr2.push(responseData[i].storeName);
          }
          this.setState({stores: arr2});
      });
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleTransaction(event){
    event.preventDefault();
    //console.log("State: ", this.state);
    //console.log("Store: ", event.target[1].value);
    //console.log("Amount: ", event.target[2].value);
    //console.log("Date: ", event.target[3].value);
    //console.log("Category: ", event.target[4].value);
    //console.log("Payment: ", event.target[6].value);


    var form = JSON.stringify({
         storeName : event.target[1].value,
         amount : event.target[2].value,
         date : event.target[3].value,
         category : event.target[4].value,
         paymentType: event.target[6].value
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

          //<DatePicker autoClose='true'/>
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
          <Input label="Payment Type" type="select" value={this.props.paymentType} onChange={this.handleChange.bind(this)}>
              <option key="cash" value="Cash">Cash</option>
              <option key="credit" value="Credit">Credit</option>
              <option key="debit" value="Debit">Debit</option>
              <option key="other" value="Other">Other</option>
          </Input>
          <Button type="submit" waves='light'>Submit<Icon left>done</Icon></Button>
        </div>
      </form>
    );
  }
}

export default TransactionForm;
