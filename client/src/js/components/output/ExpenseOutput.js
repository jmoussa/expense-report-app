import React, { Component } from 'react';
import { Button } from 'react-materialize';
import '../../../styles/component-styles/Expense.css';

class ExpenseOutput extends Component {
  constructor(props){
    super(props);
    this.state = {
      expenseData: [],
      toggle: false, //true = ASC false = DESC
      isLoading: true
    }
  }
  
  componentWillMount(){
    //grab initial database values
    var sentData = {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }
    fetch('http://127.0.0.1:3001/getAll', sentData)
      .then(response => {return response.json();})
      .then(responseData => {
        this.setState({expenseData: responseData, isLoading: false});
      });
  }
  sortChoice(e){
    e.preventDefault();
    //toggle state
    this.setState({toggle: !this.state.toggle});
    //transcribe toggle to SQL value
    var toggle = this.state.toggle === false ? 'DESC' : 'ASC';
    
    var form = JSON.stringify({
      sort: e.target.value + " " + toggle
    });
    var sentData = {
      method: 'POST',
      mode: 'cors',
      body: form,
      headers: {
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }

    fetch("http://127.0.0.1:3001/getAll", sentData)
      .then(response => {return response.json();})
      .then(responseData => {
        this.setState({expenseData: responseData});
      });
     
  }

  render() {
    return (
      <div className="tableReport">
        <h4>Expense Report</h4>
        { this.state.isLoading ? ( <p>Loading</p> ) : 
        <table>
          <thead>
            <tr>
              <th><Button className="butn">Idx</Button></th>
              <th><Button className="butn" value="merchant.`storeName`" onClick={this.sortChoice.bind(this)}>Store</Button></th>
              <th><Button className="butn" >Phone</Button></th>
              <th><Button className="butn" value="transactions.`amount`" onClick={this.sortChoice.bind(this)}>Amount</Button></th>
              <th><Button className="butn" value="transactions.`date`" onClick={this.sortChoice.bind(this)}>Date</Button></th>
              <th><Button className="butn" value="transactions.`paymentType`" onClick={this.sortChoice.bind(this)}>Payment Type</Button></th>
            </tr>
          </thead>
        <tbody>
          {this.state.expenseData.map((item, i)=> 
          <tr key={i}>
            <td>{i+1}</td>
            <td id="name">{item.storeName}</td>
            <td>{item.storePhone}</td>
            <td id="price">$ {item.amount}</td>
            <td>{item.date}</td>
            <td id="type">{item.paymentType}</td>
          </tr>)}
        </tbody>
      </table> 
      }
      </div>
    );
  }
}

export default ExpenseOutput;
