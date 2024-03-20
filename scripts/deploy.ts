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

//Attacker.sol address = 0xF00b2d178c55B75C900431B403E40828675c9dF5
//Victim.sol address = 0x2dc07C8990Bbe7219D78Df92a6a2F6Aab6914742