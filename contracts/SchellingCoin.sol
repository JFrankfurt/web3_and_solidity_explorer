pragma solidity ^0.4.18;

//this is an implementation of the future-like contract described here by V in June 2014:
//    https://blog.ethereum.org/2014/06/30/advanced-contract-programming-example-schellingcoin/
contract SchellingCoin {
    event Commit(address user, bytes32 hash);
    event Reveal(address user, uint value);
    event Epoch(uint number);

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
        bool deleted;
        uint guess;
        bytes32 hash; // keccak256(sender's address, price estimate)
        bool in_the_money;
        uint value; // amount staked
    }

    function SchellingCoin() public {
        epoch = block.number / 4;
    }

    // can be called to trigger a payout check
    function check_epoch() public {
        if (block.number / 4 > epoch) {
            // reorder
            quickSort(users.addresses, 1, users.addresses.length);
            // low/high guesses
            uint low_cutoff = users.accounts[users.addresses[users.addresses.length * 25 / 100]].guess;
            uint high_cutoff = users.accounts[users.addresses[users.addresses.length * 75 / 100]].guess;
            // calculate total stake
            // refund non-submitters
            for (uint i = 1; i <= users.addresses.length; i++) {
                uint guess = users.accounts[users.addresses[i]].guess;
                if (guess == 0) {
                    // refund these users
                } else if (guess >= low_cutoff && guess <= high_cutoff) {
                    users.accounts[users.addresses[i]].in_the_money = true;
                    balance = balance + users.accounts[users.addresses[i]].value;
                } else {
                    // users.addresses[i].transfer(users.addresses[i].value * 999 / 1000);
                }
            }

            epoch = block.number / 4;
            Epoch(epoch);
        }
    }
    // submit your commitment
    function submit_hash(bytes32 hash) public payable {
        require(block.number % 4 < 2);
        require(users.accounts[msg.sender].hash == 0x00 || users.accounts[msg.sender].deleted == true);
        Account memory a;
        a.deleted = false;
        a.guess = 0;
        //I'm just using 0 as a filler until we get the real thing
        a.hash = hash;
        a.in_the_money = false;
        a.value = msg.value;
        users.accounts[msg.sender] = a;
        Commit(msg.sender, hash);
        if (users.addresses.length == 0) {
            users.addresses.push(0);
        }
        users.addresses.push(msg.sender);
    }

    function testHash(uint guess, uint nonce) public view returns (bytes32) {
        return keccak256(msg.sender, guess, nonce);
    }

    function submit_value(uint guess, uint nonce) public {
        if (keccak256(msg.sender, guess, nonce) == users.accounts[msg.sender].hash) {
            users.accounts[msg.sender].guess = guess;
        }
    }

    function getGuess(address a) public view returns (uint) {
        return users.accounts[a].guess;
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