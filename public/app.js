
const contractAddress = "0x21d90290f846f5E98ed7e7FBEaC403c6B5AA5F75";

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

// ====== GLOBAL VARS ======
let provider;
let signer;
let contract;

// ====== DOM ======
const connectBtn = document.getElementById("connectBtn");
const accountSpan = document.getElementById("account");
const storedNumberSpan = document.getElementById("storedNumber");
const setBtn = document.getElementById("setBtn");
const numberInput = document.getElementById("numberInput");

// ====== CONNECT WALLET ======
connectBtn.onclick = async () => {
  try {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }

    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();
    const address = await signer.getAddress();
    accountSpan.innerText = address;

    contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    await readNumber();
  } catch (err) {
    console.error(err);
  }
};

// ====== READ ======
async function readNumber() {
  try {
    const value = await contract.storedNumber();
    storedNumberSpan.innerText = value.toString();
  } catch (err) {
    console.error(err);
  }
}

// ====== WRITE ======
setBtn.onclick = async () => {
  try {
    const value = numberInput.value;
    if (value === "") {
      alert("Enter a number");
      return;
    }

    const tx = await contract.setNumber(value);
    await tx.wait();

    await readNumber();
  } catch (err) {
    console.error(err);
  }
};