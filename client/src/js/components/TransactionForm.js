import React, { Component } from 'react';
import { Input, Button, Icon, DatePicker, option } from 'react-materialize';
import '../../styles/component-styles/UserForm.css';

class TransactionForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      store_name: '',
      amount: '',
      category: '',
      date: '',
      opts: [],
      stores: [],
      status: '',
      transactionResponse: {}
    }
  }
  componentDidMount(){
    var getData = {
      method:'GET',
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }
    var arr = [];
    var arr2 = [];
    fetch('http://127.0.0.1:3001/api/getCategories', getData).then( categories =>{
      return categories.json()
    }).then(cats=>{
      for(var i of cats){
        arr.push(i)
      }
      this.setState({opts: arr})
    })
    fetch('http://127.0.0.1:3001/api/getMerchants', getData).then(merchants=>{
      return merchants.json()
    }).then(mercs=>{
      for(var i of mercs){
        arr2.push(i)
      }
      this.setState({stores: arr2})
    })
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleTransaction(event){
    event.preventDefault();
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
    fetch('http://127.0.0.1:3001/api/createTransactions', sentData).then(response => { 
      return response.json()
    }).then(res=>{
      this.setState({'status':'transaction success'})
      this.setState({'transactionResponse': res})
      this.props.isFinished('success')
      return res
    })
  }

  render() {
    return (
      <form onSubmit={this.handleTransaction.bind(this)}>
        <div className="inputForm">    
          <h3>Add a Transaction</h3>
          
          <Input label="Store Name" type="select" value={this.props.store_name} onChange={this.handleChange.bind(this)}>
            {this.state.stores.map((x)=><option key={x.store_name} value={x.id}>{x.store_name}</option>)}
          </Input>
          <Input label="Amount" type="text" value={this.props.amount} onChange={this.handleChange.bind(this)} />
          
          <Input label="Date" type="text" value={this.props.date} onChange={this.handleChange.bind(this)} />
          
          <Input label="Category" type="select" value={this.props.category} onChange={this.handleChange.bind(this)}> 
            {this.state.opts.map((x)=><option key={x.name} value={x.id}>{x.name}</option>)}
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
