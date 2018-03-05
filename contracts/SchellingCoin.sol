pragma solidity ^0.4.20;

/*
this is an implementation of the future-like contract described here by V in June 2014:
    https://blog.ethereum.org/2014/06/30/advanced-contract-programming-example-schellingcoin/
*/
contract SchellingCoin {
    uint epoch;
    uint balance;
    uint hashes_submitted;
    uint output;
    string[] users;
    mapping(address => Account[]) public accounts;

    struct Account {
        string hash;
        uint deposit;
    }

    function SchellingCoin() public {
        epoch = block.number / 100;
    }

    // todo: a lot
    // can be called to trigger a payout check
    function check_epoch() {
        if (block.number / 100 > epoch) {
            // sort submitted values
            uint num_hashes = hashes_submitted;
            // calculate total deposit
            // refund non-submitters

            // reward correct guesses by taxing incorrect ones
            for (i = 0; i < hashes_submitted.length; i++) {

            }
            // clean up
            epoch = block.number / 100;
            hashes_submitted = 0;
        }
    }

    function submit_hash(string hash) {
        if (block.number % 100 < 50) {
            hashes_submitted += 1;
            accounts[msg.sender] = Account({
                hash: hash,
                deposit: msg.value
            });
        }
    }

    // send your guesses
    function submit_value() payable {

    }

    // checks the currently outstanding balance of the contract
    function request_balance() public returns (uint) {
        return balance;
    }

    function request_output() {
        return output;
    }
}