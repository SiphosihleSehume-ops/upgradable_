// const { ethers } = require('hardhat');

// async function main() {
//   const [deployer] = await ethers.getSigners();
//   console.log('Deploying from:', deployer.address);

//   const MyContract = await ethers.getContractFactory('MyContract');
//   const contract = await MyContract.deploy();
//   await contract.waitForDeployment();

//   console.log('MyContract deployed to:', await contract.getAddress());
// }

// main().catch((err) => {
//   console.error(err);
//   process.exitCode = 1;
// });

const { ethers, upgrades } = require('hardhat');

async function main() {
  const [admin] = await ethers.getSigners();

  const MyContract = await ethers.getContractFactory('MyContract');
  const proxy = await upgrades.deployProxy(MyContract, [42], {
    initializer: 'initialize',
    kind: 'uups',
  });

  await proxy.waitForDeployment();

  const proxyAddress = await proxy.getAddress();
  console.log('Proxy address: ', proxyAddress);
  console.log('Current implementation address: ', await upgrades.erc1967.getImplementationAddress(proxyAddress));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

/* Steps for the entire process:

  - npx abc-scaffold
  - Go to ALchemy infura : copy and [paste] the private keys
  - use npx hardhat run <deployment-script-path> scripts/deploy.js (locally)
  - use npx hardhat run <script> -network sepolia (deploy on sepolia)
*/