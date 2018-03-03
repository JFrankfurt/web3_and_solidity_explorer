import React, {Component} from 'react';
import Web3 from "web3";

export class WithWeb3 extends Component {
  static defaultProps = {
    network: 'Rinkeby'
  };
  state = {
    network: this.props.network
  };

  getWeb3 = () => {
    if (typeof web3 !== "undefined") {
      return new Web3(web3.currentProvider);
    } else {
      return new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
  };

  render() {
    const {network} = this.state;
    return this.props.render({
      web3: this.getWeb3(),
      network,
    })
  }
}
