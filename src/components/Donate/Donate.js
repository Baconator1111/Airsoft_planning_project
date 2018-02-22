import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Donate extends Component {
    constructor( props ){
        super( props )
        this.state = {
            amount: 0,
            message: ''
        }
    }
  onToken = (token) => {
    token.card = void 0;
    console.log('token', token);
    axios.post(`http://localhost:${process.env.SERVER_PORT}/api/payment`, { token, amount: 100 } ).then(response => console.log( response ));
  }

  handleAmount ( input ) {
    this.setState({ amount: input*100 })
  }

  handeMessage ( input ) {
    this.setState({ message: input })
  }

  render() {
      var paypalLink
      if ( this.state.amount <= 0 ){
        var paypalLink = `https://www.paypal.me/BenJohnson343/`
      } else {
        var paypalAmount = this.state.amount / 100
        var paypalLink = `https://www.paypal.me/BenJohnson343/${paypalAmount}`
      }
    return (
      <div className="donateMain">
        $<input onChange={ e => this.handleAmount( e.target.value )} type="number" min={0}/>
        <StripeCheckout
          token={this.onToken}
          stripeKey={ process.env.STRIPE_PUBLIC_KEY }
          amount={this.state.amount}
        /> or
        <a href={paypalLink} ><button>PayPal</button></a>
      </div>
    );
  }
}

export default Donate;