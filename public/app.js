const connectBtn = document.getElementById("connectBtn");
const accountSpan = document.getElementById("account");
const numberSpan = document.getElementById("number");

const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_number",
        "type": "uint256"
      }
    ],
    "name": "setNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_number",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "storedNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const contractAddress = "0x21d90290f846f5E98ed7e7FBEaC403c6B5AA5F75";

let provider;
let signer;
let contract;

connectBtn.onclick = async () => {
    try {
        if (!window.ethereum) {
            alert("MetaMask is not installed");
            return;
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        const account = await signer.getAddress();
        accountSpan.innerText = account;

        contract = new ethers.Contract(
            contractAddress,
            contractABI,
            provider
        );

        const value = await contract.storedNumber();
        numberSpan.innerText = value.toString();

    } catch (error) {
        console.error(error);
        alert("Error occurred. Check console.");
    }
};