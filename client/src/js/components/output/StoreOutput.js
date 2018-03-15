import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
//import { Button } from 'react-materialize';

class StoreOutput extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: '',
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
    fetch('http://127.0.0.1:3001/getMPC', sentData)
      .then(response => {return response.json();})
      .then(responseData => {
        this.setState({chartData: responseData, isLoading: false});
      });
  }

  render() {
    return (
      <div>
        { this.state.isLoading ? ( <p>Loading</p> ) : (<Doughnut data={this.state.chartData} />) }
      </div>
    );
  }
}

export default StoreOutput;
