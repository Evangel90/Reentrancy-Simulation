// interact.ts

import { setBlockGasLimit } from "@nomicfoundation/hardhat-toolbox/network-helpers";

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT1_ADDRESS = process.env.CONTRACT1_ADDRESS;
const CONTRACT2_ADDRESS = process.env.CONTRACT2_ADDRESS;
const ATTACKERS_PRIVATE_KEY = process.env.ATTACKERS_PRIVATE_KEY;

const contract1 = require('../artifacts/contracts/Victim.sol/Victim.json');
const contract2 = require('../artifacts/contracts/Attacker.sol/Attacker.json');

const {ethers, JsonRpcProvider } = require('ethers');

// Provider
const alchemyProvider = new JsonRpcProvider(API_URL);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const attackContractSigner = new ethers.Wallet(ATTACKERS_PRIVATE_KEY, alchemyProvider);

const victimContract = new ethers.Contract(CONTRACT1_ADDRESS, contract1.abi, signer);
const attackerContract = new ethers.Contract(CONTRACT2_ADDRESS, contract2.abi, attackContractSigner);

async function getBalance() {
    const provider = ethers.getDefaultProvider('sepolia');

    try{
        const victimBalanceInWei = await provider.getBalance(CONTRACT1_ADDRESS);
        const victimBalanceInEther = ethers.formatEther(victimBalanceInWei);

        const attackerBalanceInWei = await  provider.getBalance(CONTRACT2_ADDRESS);
        const attackerBalanceInEther = ethers.formatEther(attackerBalanceInWei);

        console.log(`Victim Balance is ${victimBalanceInEther} and Attacker Balance is ${attackerBalanceInEther}`);

    } catch(error){
        console.log('Error getting contract balance:', error);
    }
}

async function main() {
    getBalance();
    
    const deposit = await victimContract.deposit({value: ethers.parseEther('0.01')});
    await deposit.wait();
    getBalance();
    
    const attack = await attackerContract.attack({value: ethers.parseEther('0.001')});
    await attack.wait();
    getBalance();
    
}

main();

