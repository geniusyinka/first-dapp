// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [owner, randomPerson] = await ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.01')
  });

  await waveContract.deployed();

  console.log("wave contract deployed to:", waveContract.address);

  console.log("wave contract deployed by:", owner.address);

  let contractBal = await hre.ethers.provider.getBalance(waveContract.address)
  console.log('contract bal:', hre.ethers.utils.formatEther(contractBal))


  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn;
  waveTxn = await waveContract.wave('this is wave #1');
  await waveTxn.wait();

  contractBal = await hre.ethers.provider.getBalance(waveContract.address)
  console.log('contract bal:', hre.ethers.utils.formatEther(contractBal))


  waveTxn = await waveContract.wave('wave #2');
  await waveTxn.wait();

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
