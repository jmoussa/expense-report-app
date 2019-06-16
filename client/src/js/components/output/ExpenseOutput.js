import React, { Component } from 'react';
import { Button } from 'react-materialize';
import '../../../styles/component-styles/Expense.css';

class ExpenseOutput extends Component {
  constructor(props){
    super(props);
    this.state = {
      expenseData: [],
      toggle: 'ASC', //true = ASC false = DESC
      isLoading: true
    }
  }
  
  componentWillMount(){
    //grab initial database values
    var sentData = {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }
    fetch('http://127.0.0.1:3001/api/getAll', sentData)
      .then(response => {return response.json();})
      .then(responseData => {
        this.setState({expenseData: responseData, isLoading: false});
      });
  }
  sortChoice(e){
    e.preventDefault();
    this.setState({isLoading: true}) 
    this.setState(prevState=>({
      toggle: prevState.toggle === 'ASC' ? 'DESC' : 'ASC'
    }))
    var sentData = {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }
    //console.log('TOGGLE ' + this.state.toggle)
    fetch(`http://127.0.0.1:3001/api/getAll?sortOrder=${e.target.value}&toggle=${this.state.toggle}`, sentData)
      .then(response => {return response.json();})
      .then(responseData => {
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
              <th><Button className="butn">Idx</Button></th>
              <th><Button className="butn" value="merchant.store_name" onClick={this.sortChoice.bind(this)}>Store</Button></th>
              <th><Button className="butn" value="transaction.amount" onClick={this.sortChoice.bind(this)}>Amount</Button></th>
              <th><Button className="butn" value="transaction.date" onClick={this.sortChoice.bind(this)}>Date</Button></th>
              <th><Button className="butn" value="product.name" onClick={this.sortChoice.bind(this)}>Product Name</Button></th>
              <th><Button className="butn" value="category.name" onClick={this.sortChoice.bind(this)}>Category</Button></th>
            </tr>
          </thead>
        <tbody>
          {this.state.expenseData.map((item, i)=> 
            <tr key={i}>
              <td>{i+1}</td>
              <td id="name">{item.productTransaction.transactionMerchant.store_name}</td>
              <td id="price">$ {item.productTransaction.amount}</td>
              <td>{item.productTransaction.date}</td>
              <td id="product">{item.name}</td>
              <td id="category">{item.productTransaction.transactionCategory.name}</td>
            </tr>)
          }
        </tbody>
      </table> 
      }
      </div>
    );
  }
}

export default ExpenseOutput;
