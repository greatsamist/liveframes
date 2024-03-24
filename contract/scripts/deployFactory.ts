import { ethers } from "hardhat";

async function main() {
  const Contract = await ethers.getContractFactory("LiveFramesFactory");
  const deployContract = await Contract.deploy();
  await deployContract.waitForDeployment();

  console.log("DeployedContractAt:", await deployContract.getAddress());

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(50000);

  // Verify the contract after deploying
  //@ts-ignore
  await hre.run("verify:verify", {
    address: await deployContract.getAddress(),
    constructorArguments: [],
  });

  console.log("done");

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
