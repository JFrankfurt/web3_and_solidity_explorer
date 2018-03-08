pragma solidity ^0.4.20;

//this is an implementation of the future-like contract described here by V in June 2014:
//    https://blog.ethereum.org/2014/06/30/advanced-contract-programming-example-schellingcoin/
contract SchellingCoin {
    uint epoch;
    uint balance;
    uint output;
    Accounts users;

    struct Accounts {
        mapping(address => Account) accounts;
        address[] addresses;
        uint size;
    }

    struct Account {
        uint guess;
        bytes32 hash; // keccak256(sender's address, price estimate)
        uint value; // amount staked
    }

    function SchellingCoin() public {
        epoch = block.number / 100;
    }

    // can be called to trigger a payout check
    function check_epoch() public {
        if (block.number / 100 > epoch) {
            // reorder
            quickSort(users.addresses, 1, users.addresses.length);
            // low/high guesses
            uint low_cutoff = users.accounts[users.addresses[users.addresses.length * percent(25, 100, 2)]].guess;
            uint high_cutoff = users.accounts[users.addresses[users.addresses.length * percent(75, 100, 2)]].guess;
            // calculate total stake
            // refund non-submitters
            for (uint i = 1; i <= users.addresses.length; i++) {
                uint guess = users.accounts[users.addresses[i]].guess;
                if (guess >= low_cutoff && guess <= high_cutoff) {

                }
            }
            // clean up
            epoch = block.number / 100;
        }
    }

    function percent(uint numerator, uint denominator, uint precision) private pure returns (uint) {
        return ((numerator * 10 ** (precision+1) / denominator) + 5) / 10;
    }
    // submit your commitment
    function submit_hash(bytes32 hash) public payable {
        // make sure that we never assign anything to the 0 index.
        // don't let users submit more than once per epoch.
        if (block.number % 100 < 50) {
            users.accounts[msg.sender] = Account({
                guess: 0, //I'm just using 0 as a filler until we get the real thing
                hash: hash,
                value: msg.value
                });
            if (users.addresses.length == 0) {
                users.addresses.push(0);
            }
            users.addresses.push(msg.sender);
        }
    }

    function submit_value(uint guess, uint nonce) public {
        if (keccak256(msg.sender, guess, nonce) == users.accounts[msg.sender].hash) {
            users.accounts[msg.sender].guess = guess;
        }
    }

    // checks the currently outstanding balance of the contract
    function request_balance() public view returns (uint) {
        return balance;
    }

    function request_output() public view returns (uint) {
        return output;
    }

    function quickSort(address[] storage addresses, uint left, uint right) internal {
        uint i = left;
        uint j = right;
        uint pivot = users.accounts[addresses[left + (right - left) / 2]].guess;
        while (i <= j) {
            while (users.accounts[addresses[i]].guess < pivot) i++;
            while (pivot < users.accounts[addresses[j]].guess) j--;
            if (i <= j) {
                (
                users.accounts[addresses[i]].guess,
                users.accounts[addresses[j]].guess
                ) = (
                users.accounts[addresses[j]].guess,
                users.accounts[addresses[i]].guess
                );
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(addresses, left, j);
        if (i < right)
            quickSort(addresses, i, right);
    }
}