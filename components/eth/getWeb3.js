import Web3 from 'web3'

const resolveWeb3 = resolve => {
  let {web3} = window;
  const alreadyInjected = typeof web3 !== 'undefined';
  web3 = alreadyInjected
    ? new Web3(web3.currentProvider) // some other provider
    : new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); // ganache
  resolve(web3)
};

export default () =>
  new Promise(resolve => {
    window.addEventListener(`load`, () => resolveWeb3(resolve));
    if (document.readyState === `complete`) resolveWeb3(resolve)
  })