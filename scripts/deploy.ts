import { ethers } from "hardhat";

async function main() {
  // Connect to a network (replace with your desired network configuration)
  // const provider = ethers.provider;
  // await provider.send("hardhat_reset"); // Reset network for clean deployment
  // await provider.send("evm_setInterval", [500]); // Speed up mining for testing

  // Get a signer for deployments (e.g., a signer from Hardhat Network)
  // const signer = provider.getSigner();

  // --- Deploy Victim Contract ---
  const VictimFactory = await ethers.getContractFactory("Victim");
  const victim = await VictimFactory.deploy();
  await victim.waitForDeployment(); // Wait for deployment

  console.log("Victim deployed to:", victim.target);

  // --- Deploy Attacker Contract with Victim Address as Argument ---
  const AttackerFactory = await ethers.getContractFactory("Attacker");
  const attacker = await AttackerFactory.deploy(victim.target);
  await attacker.waitForDeployment(); // Wait for deployment

  console.log("Attacker deployed to:", attacker.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//Victim.sol address = 0x352f88E632F987be59B51C3f795f30621852C1dc
//Attacker.sol address = 0x8eA81fCe4Aef7BeE9F1E50F7Ef2E4e366b951A54