import React, {Component} from 'react';
import getContract from "./getContract";
import getAccounts from "./getAccounts";
import getWeb3 from "./getWeb3";
import contractDefinition from '../../build/contracts/SchellingCoin.json'

export class WithWeb3 extends Component {
  static defaultProps = {
    network: 'Rinkeby',
    renderLoading: () => <div>Loading...</div>
  };
  state = {
    error: null,
    web3: null,
    accounts: null,
    contract: null
  };

  async componentDidMount() {
    try {
      const web3 = await getWeb3();
      const accounts = await getAccounts(web3);
      const contract = '[insert contract here. lol]'; // await getContract(web3, contractDefinition);
      this.setState({web3, accounts, contract})
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {web3, accounts, contract, error} = this.state;
    return web3 && accounts
      ? this.props.render({accounts, contract, error, web3})
      : this.props.renderLoading({error})
  }
}
