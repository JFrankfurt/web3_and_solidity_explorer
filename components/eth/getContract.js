import initContract from 'truffle-contract';

export default async (web3, contractDefinition) => {
  const contract = initContract(contractDefinition);
  contract.setProvider(web3.currentProvider);
  return await contract.deployed();
};