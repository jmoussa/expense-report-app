import React, { Component } from 'react';
import '../../styles/component-styles/UserForm.css';
import {Button} from 'react-materialize';
import MerchantForm from './MasterForm';
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
    console.log("form_num = " + this.state.form_num);
    if(e==='success'){
      var prevState = this.state.form_num
      this.setState({form_num: prevState+1})
    }
  }

  navi(e){
    switch(e.target.value){
      case 'merchant':
        this.setState({form_num: 1});
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
    }else{
      CurrentForm = <Redirect to="/output" />;
    }

    return (
      <div>
        {CurrentForm}
      </div>
    );
  }
}
export default FormController;
