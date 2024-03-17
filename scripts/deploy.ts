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

//Attacker.sol address = 0x5cC1b791142606f9B37aEA9d73e8EA389eFA0290
//Victim.sol address = 0xCA2148a94Ca45F7fc0C0aF981864f72b942A8332