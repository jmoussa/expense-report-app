import React, { Component } from 'react';
import { Footer } from 'react-materialize';

import '../../styles/component-styles/Footer.css';

class FooterModule extends Component {
  render() {
    return (
   	  <Footer copyrights="@copyright 2018 Copyright"
	      moreLinks={
		      <a className="grey-text text-lighten-4 right" href="#!">More Links!?</a>
	      }
	      links={
		      <ul>
			      <li><a className="grey-text text-lighten-3" href="www.facebook.com">Facebook</a></li>
			      <li><a className="grey-text text-lighten-3" href="www.instagram.com">Instagram</a></li>
			      <li><a className="grey-text text-lighten-3" href="www.gmail.com">Email</a></li>
		      </ul>
	      }
	      className='teal'>
	  	    <h5 className="white-text">We're Here For You!</h5>
  		    <span className="grey-text text-lighten-4">Pretty sure some content should go here</span>
      </Footer> 
    );
  }
}

export default FooterModule;
