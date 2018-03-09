var SchellingCoin = artifacts.require("./SchellingCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(SchellingCoin);
};
