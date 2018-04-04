import React, { Component } from 'react';
import '../../../styles/component-styles/Expense.css';

class ExpenseOutput extends Component {
  constructor(props){
    super(props);
    this.state = {
      expenseData: [],
      isLoading: true
    }
  }
  
  componentWillMount(){
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
        console.log(responseData);
        this.setState({expenseData: responseData, isLoading: false});
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
              <th>Idx</th>
              <th>Store</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Type</th>
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
