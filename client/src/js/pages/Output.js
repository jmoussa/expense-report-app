import React, { Component } from 'react';
import { Button } from 'react-materialize';
import "../../styles/page-styles/Output.css";
import StoreOutput from "../components/output/StoreOutput";
import PriceOutput from "../components/output/PriceOutput";
import ExpenseOutput from "../components/output/ExpenseOutput";

class Output extends Component {
  constructor(props){
    super(props);
    this.state = {
      view: ''
    }
  }

  changeView(event){
    this.setState({view: event.target.value});
    console.log(this.state);
  }

  handleChange(event){
    const state = this.state;
    console.log(event.target.name);
    console.log(event.target.value);
    state[event.target.name] = event.target.value;
    this.setState(this.state);
  }

  renderView(){
    switch(this.state.view){
      case 'store':
        return <StoreOutput />;
      case 'price':
        return <PriceOutput />;
      case 'expense':
        return <ExpenseOutput />;
      default:
        return <div>Report</div>;
    }
  }

  render() {
    return (
      <div>
        <h2>Output/Visualizations</h2>
        <Button className="button" waves='light' name="view" value='store' onClick={this.handleChange.bind(this)}>Sort by Store</Button>
        <Button className="button" waves='light' name="view" value='price' onClick={this.handleChange.bind(this)}>Sort by Price</Button>
        <Button className="button" waves='light' name="view" value='expense' onClick={this.handleChange.bind(this)}>Expense Report</Button>
        {this.renderView()}
      </div>
    );
  }
}

export default Output;
