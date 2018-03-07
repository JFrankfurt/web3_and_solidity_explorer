pragma solidity ^0.4.19;

//this is an implementation of the future-like contract described here by V in June 2014:
//    https://blog.ethereum.org/2014/06/30/advanced-contract-programming-example-schellingcoin/
contract SchellingCoin {
    uint epoch;
    uint balance;
    uint output;
    Accounts users;

    struct Accounts {
        mapping(address => Account) accounts;
        Address[] addresses;
        uint size;
    }

    struct Account {
        uint keyIndex;
        uint value; // amount staked
        bytes32 hash; // keccak256(sender's address, price estimate)
    }

    struct Address {
        address key;
        bool deleted;
    }

    function SchellingCoin() public {
        epoch = block.number / 100;
    }

    // can be called to trigger a payout check
    function check_epoch() public {
        if (block.number / 100 > epoch) {
            uint twenty_fifth_percentile_index = arr.length * 0.25;
            uint seventy_fifth_percentile_index = arr.length * 0.75;
//            if (arr[index] % 1 == 0) {
//                return arr[index];
//            } else {
//                return arr[Math.round(index)];
//            }
            // calculate total stake
            // refund non-submitters

            // reward correct guesses by taxing incorrect ones
            // for (uint i = 0; i < users.length; i++) {}
            // clean up
            epoch = block.number / 100;
        }
    }

    // submit your commitment
    function submit_hash(bytes32 hash) public payable {
        if (block.number % 100 < 50 && users.accounts[msg.sender].hash != 0x00) {
            users.accounts[msg.sender] = Account({
                keyIndex: users.addresses.length,
                value: msg.value,
                hash: hash
                });
            users.addresses.push(Address({key: msg.sender, deleted: false}));
        }
    }

    // function submit_value(uint guess) public returns (bool){
    //     if (keccak256(msg.sender, guess) == accounts[msg.sender].hash) {
    //         guesses[msg.sender].guess = guess;
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // submit proof of your guess
    function submit_value(uint guess) public returns (bool replaced) {
        return guess > 5;
    }

    // checks the currently outstanding balance of the contract
    function request_balance() public view returns (uint) {
        return balance;
    }

    function request_output() public view returns (uint) {
        return output;
    }

    function quickSort(uint[] storage arr, uint left, uint right) internal {
        uint i = left;
        uint j = right;
        uint pivot = arr[left + (right - left) / 2];
        while (i <= j) {
            while (arr[i] < pivot) i++;
            while (pivot < arr[j]) j--;
            if (i <= j) {
                (arr[i], arr[j]) = (arr[j], arr[i]);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, left, j);
        if (i < right)
            quickSort(arr, i, right);
    }
}