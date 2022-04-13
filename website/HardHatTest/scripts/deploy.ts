// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const Kyc = await ethers.getContractFactory("Kyc");
  console.log('Deploying Kyc contract...');
  const kyc = await Kyc.deploy();
  await kyc.deployed();
  console.log("Kyc contract deployed to:", kyc.address);

  const SubscriptionManager = await ethers.getContractFactory("SubscriptionManager");
  console.log('Deploying SubscriptionManager contract...');
  const subscriptionManager = await SubscriptionManager.deploy(kyc.address);
  await subscriptionManager.deployed();
  console.log("SubscriptionManager contract deployed to:", subscriptionManager.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
