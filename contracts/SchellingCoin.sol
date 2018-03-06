pragma solidity ^0.4.19;

/*
this is an implementation of the future-like contract described here by V in June 2014:
    https://blog.ethereum.org/2014/06/30/advanced-contract-programming-example-schellingcoin/
*/
contract SchellingCoin {
    uint epoch;
    uint balance;
    uint output;

    struct Accounts {
        mapping(address => IndexValue) data;
        KeyFlag[] keys;
        uint size;
    }

    struct IndexValue {
        uint keyIndex;
        uint value; // amount staked
        bytes32 hash; // keccak256(sender's address, price estimate)
    }

    struct KeyFlag {
        uint key;
        bool deleted;
    }

    function SchellingCoin() public {
        epoch = block.number / 100;
    }

    // can be called to trigger a payout check
    function check_epoch() public {
        if (block.number / 100 > epoch) {
            // calculate total stake
            // refund non-submitters

            // reward correct guesses by taxing incorrect ones
            for (uint i = 0; i < users.length; i++) {

            }
            // clean up
            epoch = block.number / 100;
            hashes_submitted = 0;
        }
    }

    // submit your commitment
    function submit_hash(bytes32 hash) public payable {
        if (block.number % 100 < 50) {
            hashes_submitted += 1;
            accounts[msg.sender] = Account({hash : hash, value : msg.value});
            users.push(msg.sender);
        }
    }

    // submit proof of your guess
    function submit_value(uint guess) public returns (bool){
        if (keccak256(msg.sender, guess) == accounts[msg.sender].hash) {
            guesses[msg.sender].guess = guess;
            return true;
        } else {
            return false;
        }
    }

    // checks the currently outstanding balance of the contract
    function request_balance() public returns (uint) {
        return balance;
    }

    function request_output() public returns (uint) {
        return output;
    }
}