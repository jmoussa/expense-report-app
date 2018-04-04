import React, { Component } from 'react';
import '../../styles/component-styles/UserForm.css';
import {Button} from 'react-materialize';
import CategoryForm from './CategoryForm';
import MerchantForm from './MerchantForm';
import TransactionForm from './TransactionForm';
import ProductForm from './ProductForm';
import {Redirect} from 'react-router';


let CurrentForm = null;
class FormController extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      form_num: 1
    };
  }
  completedForm(e){
    var prevState = this.state.form_num;
    this.setState({form_num: prevState+1});
    //console.log("form_num = " + this.state.form_num);
    //console.log("completed form finshed e = " + e);
  }

  navi(e){
    switch(e.target.value){
      case 'merchant':
        this.setState({form_num: 1});
        break;
      case 'category':
        this.setState({form_num: 2});
        break;
      case 'transaction':
        this.setState({form_num: 3});
        break;
      case 'product':
        this.setState({form_num: 4});
        break;
      default:
        this.setState({form_num: 1});
        break;
    }
  }
  redir(e){
    this.setState({form_num: 1});
  }

  //I want to be able to change merchantSuccess inside of MerchantForm, CategoryForm etc
  //And have it retain it's value across the forms so the formcontroller can identify which one to render
  render() {
    
    if(this.state.form_num === 1){
      CurrentForm = <MerchantForm isFinished={this.completedForm.bind(this)} />;
    }else if(this.state.form_num === 2){
      CurrentForm = <CategoryForm isFinished={this.completedForm.bind(this)} />;
    }else if(this.state.form_num === 3){
      CurrentForm = <TransactionForm isFinished={this.completedForm.bind(this)} />;
    }else if(this.state.form_num === 4){
      CurrentForm = <ProductForm isFinished={this.completedForm.bind(this)} redirect={this.redir.bind(this)}/>;
    }else{
      CurrentForm = <Redirect to="/output" />;
    }

    return (
      <div>
        <Button className='btn' value="merchant" onClick={this.navi.bind(this)}>Merchant Info</Button>
        <Button className='btn' value="category" onClick={this.navi.bind(this)}>Category</Button>
        <Button className='btn' value="transaction" onClick={this.navi.bind(this)}>Transaction</Button>
        <Button className='btn' value="product" onClick={this.navi.bind(this)}>Items</Button>
        {CurrentForm}
      </div>
    );
  }
}
export default FormController;
