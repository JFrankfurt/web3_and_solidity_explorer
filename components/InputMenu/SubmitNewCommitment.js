import React, {Component} from 'react'
import {MenuStyles} from "./index";

export default class SubmitNewCommitment extends Component {
  state = {
    price: '',
    nonce: '',
    stake: ''
  };

  change = e => {
    if (!isNaN(parseInt(e.target.value)) || e.target.value === '') {
      this.setState({[e.target.name]: e.target.value});
    }
  };

  submitHash = () => {
    const {contract, web3} = this.props;
    let {price, nonce} = this.state;
    price = parseInt(price, 10);
    nonce = parseInt(nonce, 10) || 1;
    console.log(`hashing these together: account - ${web3.eth.accounts[0]}; price - ${price}; nonce - ${nonce};`);
    const hash = web3.sha3(`${web3.eth.accounts[0]}${price}${nonce}`);
    console.log(`contract: ${contract}; hash: ${hash}`);
    // contract.submit_hash(hash);
    this.setState({price: '', nonce: '', stake: ''})
  };

  render() {
    const {price, nonce, stake} = this.state;
    const {change, submitHash} = this;
    return (
      <div className='price-root'>
        <h3 className='title'>new price</h3>
        <span className='input'>
          USD/ETH:
          <input type="text" placeholder="Price of 1 ETH in USD" name="price" value={price} onChange={change}/>
        </span>
        <span className='input'>
          Nonce:
          <input type="text" placeholder="Remember this!" name="nonce" value={nonce} onChange={change}/>
        </span>
        <span className='input'>
          Stake (WEI):
          <input type="text" placeholder="Stake in WEI" name="stake" value={stake} onChange={change}/>
        </span>
        <span className="button" onClick={submitHash}>Submit</span>
        <MenuStyles/>
        <style jsx>{`
          .price-root {
            background-color: #f0f0f0;
            display: grid;
            grid-template-rows: 32px auto auto 40px;
            grid-row-gap: 4px;
            height: auto;
            width: 100%;
          }
        `}</style>
      </div>
    );
  }
}