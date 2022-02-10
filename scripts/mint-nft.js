require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// console.log(JSON.stringify(contract.abi));

const contractAddress = "0x30025c0A04b65321D5b9dAE73B857DC2DDDe5647";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
//create transaction
async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

    //the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        );
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        );
                    }
                }
            );
        })
        .catch((err) => {
            console.log(" Promise failed:", err);
        });
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmU9eeaCwpHSbHzFTR6VDRLksPzMmL4otA9qnEZbCvdhfq");

//0xbb170c98165bfe4acf727e6bff22822bede1f1a467b68e50de0db1b33d1265b0