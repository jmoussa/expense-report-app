import React, { Component } from 'react';
import '../../styles/component-styles/UserForm.css';
import CategoryForm from './CategoryForm';
import MerchantForm from './MerchantForm';
import TransactionForm from './TransactionForm';
import {Redirect} from 'react-router';


let CurrentForm = null;
class FormController extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      form_num: 0 
    };
  }
  completedForm(e){
    var prevState = this.state.form_num;
    this.setState({form_num: prevState+1});
    console.log("form_num = " + this.state.form_num);
    console.log("completed form finshed e = " + e);
  }

  //I want to be able to change merchantSuccess inside of MerchantForm, CategoryForm etc
  //And have it retain it's value across the forms so the formcontroller can identify which one to render
  render() {
    
    if(this.state.form_num === 0){
      CurrentForm = <MerchantForm isFinished={this.completedForm.bind(this)} />;
    }else if(this.state.form_num === 1){
      CurrentForm = <CategoryForm isFinished={this.completedForm.bind(this)} />;
    }else if(this.state.form_num === 2){
      CurrentForm = <TransactionForm isFinished={this.completedForm.bind(this)} />;
    }else{
      CurrentForm = <Redirect to="/output" />;
    }

    return (
      <div>{CurrentForm}</div>
    );
  }
}
export default FormController;
