import React, { Component } from 'react';
import { Button } from 'react-materialize';
import "../../styles/page-styles/Output.css";
import PieOutput from "../components/output/PieOutput";

class Output extends Component {
  constructor(props){
    super(props);
    this.state = {
      view: ''
    }
  }

  changeView(event){
    this.setState({view: event.target.value});
  }

  handleChange(event){
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(this.state);
  }

  renderView(){
    switch(this.state.view){
      case 'store':
        return <PieOutput />;
      //case 'price':
        //return <PriceOutput />;
      //case 'expense':
        //return <ExpenseOutput />;
      default:
        return <PieOutput/>;
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
