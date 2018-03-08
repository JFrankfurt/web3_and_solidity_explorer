import React, {Component} from 'react';
import {MenuStyles} from "./index";

export default class ValidateCommitment extends Component {
  state = {
    price: '',
    nonce: ''
  };

  change = e => {
    if (!isNaN(parseInt(e.target.value)) || e.target.value === '') {
      this.setState({[e.target.name]: e.target.value});
    }
  };

  submitValue = () => {
    const {contract} = this.props;
    let {price, nonce} = this.state;
    price = parseInt(price, 10);
    nonce = parseInt(nonce, 10);
    console.log(`sending: price - ${price}; nonce - ${nonce};`);
    console.log(`contract: ${contract}; hash: ${hash}`);
    // contract.submit_value(hash);
    this.setState({price: '', nonce: ''})
  };

  render() {
    const {price, nonce} = this.state;
    const {change, submitValue} = this;
    return (
      <div className="validation-root">
        <h3 className='title'>Confirm your submission</h3>
        <span className='input'>
          USD/ETH:
          <input type="text" placeholder="Price of 1 ETH in USD" name="price" value={price} onChange={change}/>
        </span>
        <span className='input'>
          Nonce:
          <input type="text" placeholder="Remember this!" name="nonce" value={nonce} onChange={change}/>
        </span>
        <span className="button" onClick={submitValue}>validate</span>
        <MenuStyles/>
        <style jsx>{`
        .validation-root {
          background-color: #f0f0f0;
          display: grid;
          grid-template-rows: 32px auto auto 40px;
          grid-row-gap: 4px;
          height: auto;
          width: 100%;
        }
        `}</style>
      </div>
    )
  }
}