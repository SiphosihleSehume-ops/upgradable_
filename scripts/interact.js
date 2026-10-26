async function main() {
    const myContractAddress = "0x3f89184C9b645cbc0F6CbC8AbBb52E929c396119"; // replace with your deployed contract address (upgraded contract address)
    const myContract = await ethers.getContractAt("MyContractV2", myContractAddress);

    // Call incrementValue
    const tx = await myContract.incrementValue();
    await tx.wait();

    const newValue = await myContract.value();
    console.log("New value after increment:", newValue.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });