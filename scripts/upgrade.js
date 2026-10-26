const { ethers, upgrades } = require('hardhat');

// Address of the proxy contract from your initial deployment
const PROXY_ADDRESS = '0x3f89184C9b645cbc0F6CbC8AbBb52E929c396119';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Upgrading from:', deployer.address);

  const MyContractV2 = await ethers.getContractFactory('MyContractV2');
  const upgraded = await upgrades.upgradeProxy(PROXY_ADDRESS, MyContractV2);
  await upgraded.waitForDeployment();

  console.log('Proxy upgraded at:', await upgraded.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
