const sha3 = require('solidity-sha3')
var SchellingCoin = artifacts.require("./SchellingCoin.sol");


contract('SchellingCoin', function(accounts) {

  it("...should commit and reveal a guess", function() {
    let guess = 10
    let nonce = 100
    return SchellingCoin.deployed().then(function(instance) {
      schellingCoinInstance = instance;

      let commit_hash = sha3.default(accounts[0], guess, nonce)
      return schellingCoinInstance.submit_hash(commit_hash, {from: accounts[0]});
    }).then(function() {
      return schellingCoinInstance.getGuess.call(accounts[0]);
    }).then(function(user_guess) {
      assert.equal(user_guess.toNumber(), 0, "The users guess should be 0 initially");
    }).then(function() {
      return schellingCoinInstance.testHash.call(guess, nonce);
    }).then(function(hash) {
      return schellingCoinInstance.submit_value(guess, nonce, {from: accounts[0]});
    }).then(function() {
      return schellingCoinInstance.getGuess.call(accounts[0]);
    }).then(function(user_guess) {
      assert.equal(user_guess.toNumber(), 10, "The users guess wasn't saved");
    });
  });
});
