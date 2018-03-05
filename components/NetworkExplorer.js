import React, {Component} from 'react';

export default class NetworkExplorer extends Component {
  state = {
    data: {},
    explain: '',
    functions: Object.keys(this.props.web3.eth)
  };

  functionsToHide = ['_requestManager'];

  stateManager = (data, explain) =>
    this.setState(() => ({data, explain}));

  makeExplanation = key => text =>
    <span>{text} [<a target="_blank"
                     href={`https://github.com/ethereum/wiki/wiki/JavaScript-API#web3eth${key.toLowerCase()}`}>docs</a>] </span>;

  callback = text => (err, res) => {
    if (err) {
      console.error(err);
      this.stateManager(err.message, text);
    } else {
      console.log(res);
      const type = typeof res;
      const content =
        type === 'boolean' || type === 'number'
          ? res.toString()
          : {...res};
      this.stateManager(content, text);
    }
  };

  send = key => () => {
    const {eth} = this.props.web3;
    const explanation = this.makeExplanation(key);
    const {callback} = this;
    const transaction = {
      from: '0x627306090abab3a6e1400e9345bc60c78a8bef57',
      to: '0x87e2799db569eb7eca9de03c4ccf332ccc9fa5ca',
      value: 1000000000,
      gas: 100000000,
      gasPrice: 100000,
      data: '00000001',
      nonce: 1
    };
    switch (key) {
      case 'defaultAccount':
        return eth.defaultAccount(callback(explanation('currently set default address')));
      case 'defaultBlock':
        return eth.defaultBlock(callback(explanation('used internally for some methods and defaults to "latest"')));
      case 'syncing':
      case 'getSyncing':
        return eth.getSyncing(callback(explanation('returns the either a sync object when the node is syncing or false')));
      case 'isSyncing':
        return eth.isSyncing(callback(explanation('calls a provided callback with true/false when syncing starts/stops and is used as a lifecycle hook. While syncing it also passes a metaData object.')));
      case 'getBalance':
        return eth.getBalance(
          '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
          callback(explanation('retrieves balance for a given address (0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359 here)'))
        );
      case'coinbase':
      case'getCoinbase':
        return eth.getCoinbase(callback(explanation('coinbase/getCoinbase returns the address that receives mining rewards')));
      case 'getMining':
      case 'mining':
        return eth.getMining(callback(explanation('This property is read only and returns whether the node is mining or not')));
      case'getHashrate':
      case'hashrate':
        return eth.getHashrate(callback(explanation('This property is read only and returns the number of hashes per second that the node is mining with')));
      case'gasPrice':
      case'getGasPrice':
        return eth.getGasPrice(callback(explanation('This property is read only and returns the the current gas price.')));
      case 'accounts':
      case 'getAccounts':
        return eth.getAccounts(callback(explanation('This property is read only and returns a list of accounts the node controls.')));
      case 'blockNumber':
      case 'getBlockNumber':
        return eth.getBlockNumber(callback(explanation('This property is read only and returns the current block number.')));
      case 'getStorageAt':
        return eth.getStorageAt(
          '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
          callback(explanation('Gets storage at a specific position of an address (0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359, 0) here)'))
        );
      case 'getCode':
        return eth.getCode(
          '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
          callback(explanation('get the code at a specific address (0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359) here)'))
        );
      case 'getBlock':
        return eth.getBlock(
          "latest", true,
          callback(explanation('returns data on a given block hash or number (latest here)')));
      case 'getBlockTransactionCount':
        return eth.getBlockTransactionCount(
          "latest",
          callback(explanation('Returns the number of transactions in a given block. ("latest" here)'))
        );
      case 'getUncle':
        return eth.getUncle(
          "latest", 0, true,
          callback(explanation(`Returns a block's uncle by a given index position. ("latest", 0 here)`))
        );
      case 'getTransaction':
        return eth.getTransaction(
          '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060',
          callback(explanation(`Returns a transaction matching the given transaction hash. ("0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060" used here)`))
        );
      case 'getTransactionFromBlock':
        return eth.getTransactionFromBlock(
          "latest", 0,
          callback(explanation("Returns a transaction based on a block hash or number and the transaction's index position."))
        );
      case 'getTransactionReceipt':
        return eth.getTransactionReceipt(
          '0x47d47ba358a471d2f88a04bb96bb203242d3d6d2b32df2b8f3e55e4f1a386faf',
          callback(explanation('Returns the receipt of a transaction by transaction hash. ("0x47d47ba358a471d2f88a04bb96bb203242d3d6d2b32df2b8f3e55e4f1a386faf" here)'))
        );
      case 'getTransactionCount':
        return eth.getTransactionCount(
          '0x47d47ba358a471d2f88a04bb96bb203242d3d6d2b32df2b8f3e55e4f1a386faf',
          callback(explanation('Get the numbers of transactions sent from an address. ("0x47d47ba358a471d2f88a04bb96bb203242d3d6d2b32df2b8f3e55e4f1a386faf" here)'))
        );
      case 'sendTransaction':
        const res = {
          hash: '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060',
          transaction
        };
        return callback(explanation(`Sends a transaction (see below) to the network and returns the transaction hash.`))(null, res);
      case 'sendRawTransaction':
        return callback(explanation('Sends a transaction signed by a private key and hex encoded.'))(
          null, {hint: 'Just check out this link instead: https://github.com/ethereum/wiki/wiki/JavaScript-API#example-46'})
      case 'sign':
        return eth.sign(
          '0x87e2799db569eb7eca9de03c4ccf332ccc9fa5ca',
          'Kanye wants to buy some bonds',
          callback(explanation('Signs some data (hex encoded "Kanye wants to buy some bonds") with a specified unlocked account.'))
        );
      case 'call':
        return eth.call(
          transaction,
          callback(explanation('Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.'))
        );
      case 'estimateGas':
        const {data, to} = transaction;
        return eth.estimateGas(
          {to, data},
          callback(explanation('Executes a message call or transaction directly in the VM of the node. This is not mined into the blockchain and returns the amount of gas used.'))
        );
      case 'filter':
        return callback(explanation('Provides a means of watching for certain events.'))(null, {
          get: 'function((err, res) => {logIndex: Number, transactionIndex: Number, transactionHash: String, blockHash: String, blockHash: Number, address: String, data: String, topics: String[]}',
          watch: 'function((err, res) => ...',
          stopWatching: 'function((err, res) => ...',
        });
      case 'getCompilers':
        return eth.getCompilers(callback(explanation('Returns an array of available compilers (["lll", "solidity", "serpent"])')));
      case 'compile':
        return callback(explanation('This object provides three methods for compiling hex-encoded source code'))(
          null, {keys: Object.keys(eth.compile)}
        );
      case 'namereg':
        return callback(explanation('A surprisingly poorly documented api for the GlobalRegistrar object.'))(
          null, {keys: Object.keys(eth.namer)}
        );
      case 'sendIBANTransaction':
        const {from} = transaction;
        return eth.sendIBANTransaction({
          from,
          to: 'XE81ETHXREGGAVOFYORK',
          value: 0x100
        });
      case 'iban':
        return callback(explanation('Instantiates an IBAN object of utility functions.'))(
          null, {keys: Object.keys(eth.iban)}
        );
    }
  };

  render() {
    const {data, explain, functions} = this.state;
    return (
      <div className='network-root'>
        <h2 className='header'>Web3's&nbsp;
          <pre>eth</pre>
          &nbsp;API
        </h2>
        <pre className='explanation'>{explain || 'Select a function below to see what it returns...'}</pre>
        <pre className='response'>{JSON.stringify(data, undefined, 2)}</pre>
        <div className='functions'>
          {functions
            .filter(key => !this.functionsToHide.includes(key))
            .map(key => <div className='send' onClick={this.send(key)} key={key}>{key}</div>)}
        </div>
        <pre>some undocumented api surface here is left unimplemented (i.e., eth.getBlockUncleCount)</pre>
        <style jsx>{`
        .network-root {
          display: grid;
          grid-template-rows: 40px auto auto auto 20px;
          max-width: 800px;
        }
        .header {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        }
        .response {
          background-color: #f0f0f0;
          min-width: 600px;
          word-wrap: break-word;
          white-space: pre-wrap;
          height: 400px;
          overflow-Y: scroll;
          overflow-X: hidden;
        }
        .explanation {
          word-break: break-all;
          white-space: normal;
        }
        .functions {
          min-width: 300px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .send {
          background-color: #33ffce;
          cursor: pointer;
          padding: 4px;
          margin: 2px;
          border-radius: 2px;
        }
        `}</style>
      </div>
    )
  }
}