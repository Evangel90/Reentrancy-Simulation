// interact.ts

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT1_ADDRESS = process.env.CONTRACT1_ADDRESS;
const CONTRACT2_ADDRESS = process.env.CONTRACT2_ADDRESS;

const contract1 = require('../artifacts/contracts/Victim.sol/Victim.json');
const contract2 = require('../artifacts/contracts/Attacker.sol/Attacker.json');

const ethers = require('ethers');

// Provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const victimContract = new ethers.Contract(CONTRACT1_ADDRESS, contract1.abi, signer);
const attackerContract = new ethers.Contract(CONTRACT2_ADDRESS, contract2.abi, signer);

async function main() {
    const deposite = await victimContract.deposite();
    const attack = await attackerContract.attack();
}