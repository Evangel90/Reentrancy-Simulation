// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.6;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Victim {
   mapping(address => uint256) balances;

   function deposit() public payable{
        require(msg.value > 0, "You need to send some ether");
        balances[msg.sender] += msg.value;
   }

   function withdraw() external payable {
        uint256 amount = balances[msg.sender];
        require(balances[msg.sender] > 0, "You don't have any balance");
        
        (bool success, ) = msg.sender.call{value: amount}("");
        balances[msg.sender] = 0;
        require(success, "Transfer failed.");
   }
}