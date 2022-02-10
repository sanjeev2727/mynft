async function main() {

    // We get the contract to deploy
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();

    console.log("MyNFT deployed to:", myNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
//npx hardhat run scripts/deploy.js
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

    //0x2d8eF542960507feD2AC5a09DAA8f335A04623b5
    //0x30025c0A04b65321D5b9dAE73B857DC2DDDe5647
