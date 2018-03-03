import React, {Component} from 'react';

export default class NetworkExplorer extends Component {
  state = {
    data: {},
    explain: ''
  };
  stateManager = (data, explain) => this.setState(() => ({data, explain}));
  explanation = key => text =>
    <span>
        {text}
      [<a target="_blank"
          href={`https://github.com/ethereum/wiki/wiki/JavaScript-API#web3eth${key.toLowerCase()}`}>docs</a>]
      </span>;
  send = key => () => {
    const {eth} = this.props.web3;
    const explanation = this.explanation(key);
    switch (key) {
      case 'defaultAccount':
        return eth.defaultAccount((err, res) => {
          const str = 'currently set default address';
          typeof res === 'boolean' ?
            this.stateManager(res.toString(), explanation(str))
            :
            this.stateManager({...res}, explanation(str));
        });
      case 'defaultBlock':
        return eth.defaultBlock((err, res) => {
          typeof res === 'boolean'
            ? this.stateManager(res.toString(), explanation('used internally for some methods and defaults to "latest"'))
            : this.stateManager({...res}, explanation('used internally for some methods and defaults to "latest"'));
        });
      case 'syncing':
      case 'getSyncing':
        return eth.getSyncing((err, res) => {
          typeof res === 'boolean'
            ? this.stateManager(res.toString(), explanation('returns the either a sync object when the node is syncing or false'))
            : this.stateManager({...res}, explanation('returns the either a sync object when the node is syncing or false'));
        });
      case 'isSyncing':
        return eth.isSyncing((err, res) => {
          typeof res === 'boolean'
            ? this.stateManager(res.toString(), explanation('calls a provided callback with true/false when syncing starts/stops and is used as a lifecycle hook. While syncing it also passes a metaData object.'))
            : this.stateManager({...res}, explanation('calls a provided callback with true/false when syncing starts/stops and is used as a lifecycle hook. While syncing it also passes a metaData object.'));
        });
      case 'getBalance':
        return eth.getBalance('0x627306090abaB3A6e1400e9345bC60c78a8BEf57', (err, res) => {
          typeof res === 'boolean'
            ? this.stateManager(res.toString(), explanation('retrieves balance for a given address (0x627306090abaB3A6e1400e9345bC60c78a8BEf57 here)'))
            : this.stateManager({...res}, explanation('retrieves balance for a given address (0x627306090abaB3A6e1400e9345bC60c78a8BEf57 here)'));
        });
      case 'coinbase':
      case 'getCoinbase':
        return eth.getCoinbase((err, res) => {
          typeof res === 'boolean'
            ? this.stateManager(res.toString(), explanation('coinbase/getCoinbase returns the address that receives mining rewards'))
            : this.stateManager({...res}, explanation('coinbase/getCoinbase returns the address that receives mining rewards'));
        });
      case 'getMining':
      case 'mining':
        return eth.getMining((err, res) => {
          typeof res === 'boolean'
            ? this.stateManager(res.toString(), explanation('This property is read only and returns whether the node is mining or not'))
            : this.stateManager({...res}, explanation('This property is read only and returns whether the node is mining or not'));
        });
      case 'getHashrate':
      case 'hashrate':
        return eth.getHashrate((err, res) => {
          typeof res === 'boolean'
            ? this.stateManager(res.toString(), explanation('This property is read only and returns the number of hashes per second that the node is mining with'))
            : this.stateManager({...res}, explanation('This property is read only and returns the number of hashes per second that the node is mining with'));
        });
      case 'gasPrice':
      case 'getGasPrice':
        return eth.getGasPrice((err, res) => {
          typeof res === 'boolean'
            ? this.stateManager(res.toString(), explanation('This property is read only and returns the the current gas price.'))
            : this.stateManager({...res}, explanation('This property is read only and returns the the current gas price.'));
        });
      case 'accounts':
      case 'getAccounts':
        return eth.getAccounts((err, res) => {
          typeof res === 'boolean'
            ? this.stateManager(res.toString(), explanation('This property is read only and returns a list of accounts the node controls.'))
            : this.stateManager({...res}, explanation('This property is read only and returns a list of accounts the node controls.'));
        });
      case 'blockNumber':
      case 'getBlockNumber':
        return eth.getBlockNumber((err, res) => {
          typeof res === 'boolean'
            ? this.stateManager(res.toString(), explanation('This property is read only and returns the current block number.'))
            : this.stateManager({...res}, explanation('This property is read only and returns the current block number.'));
        });
      case 'getStorageAt':
        return eth.getStorageAt('0x627306090abaB3A6e1400e9345bC60c78a8BEf57', (err, res) => {
          this.stateManager({...res}, explanation('get storage at a specific position of an address (0x627306090abaB3A6e1400e9345bC60c78a8BEf57, 0) here)'))
        });
      case 'getCode':
        return eth.getCode('0x627306090abaB3A6e1400e9345bC60c78a8BEf57', (err, res) => {
          this.stateManager({...res}, explanation('get the code at a specific address (0x627306090abaB3A6e1400e9345bC60c78a8BEf57) here)'))
        });
      case 'getBlock':
        return eth.getBlock(5187409, true, (err, res) => {
          typeof res === 'boolean'
            ? this.stateManager(res.toString(), explanation('returns data on a given block hash or number (5187409 here)'))
            : this.stateManager({...res}, explanation('returns data on a given block hash or number (5187409 here)'));
        });
    }
  };

  render() {
    const {eth} = this.props.web3;
    const {data, explain} = this.state;
    return (
      <div className="root">
        <h2 className="header">Web3's&nbsp;
          <pre>eth</pre>
          &nbsp;API
        </h2>
        <pre>{explain || 'Select a function below to see what it returns...'}</pre>
        <pre className='response'>{JSON.stringify(data, undefined, 4)}</pre>
        <div className="functions">
          {Object.keys(eth)
            .filter(key => key !== '_requestManager')
            .map(objKey =>
              <div className="send" onClick={this.send(objKey)} key={objKey}>{objKey}</div>
            )}
        </div>
        <style jsx>{`
        .root {
          display: grid;
          grid-template-rows: 40px 20px auto auto;
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