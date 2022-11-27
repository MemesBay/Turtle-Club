
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import axios from 'axios';
import React, { Component } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

const ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_mintAmount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_state",
				"type": "bool"
			}
		],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseExtension",
				"type": "string"
			}
		],
		"name": "setBaseExtension",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseURI",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newmaxMintAmount",
				"type": "uint256"
			}
		],
		"name": "setmaxMintAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseExtension",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxMintAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "walletOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const VAULTABI = [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "Claimed",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "NFTStaked",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "NFTUnstaked",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "VaultInfo",
			"outputs": [
				{
					"internalType": "contract Collection",
					"name": "nft",
					"type": "address"
				},
				{
					"internalType": "contract N2DRewards",
					"name": "token",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "contract Collection",
					"name": "_nft",
					"type": "address"
				},
				{
					"internalType": "contract N2DRewards",
					"name": "_token",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_name",
					"type": "string"
				}
			],
			"name": "addVault",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_pid",
					"type": "uint256"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256[]",
					"name": "tokenIds",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256",
					"name": "_pid",
					"type": "uint256"
				}
			],
			"name": "claim",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"internalType": "uint256[]",
					"name": "tokenIds",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256",
					"name": "_pid",
					"type": "uint256"
				}
			],
			"name": "claimForAddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256[]",
					"name": "tokenIds",
					"type": "uint256[]"
				}
			],
			"name": "earningInfo",
			"outputs": [
				{
					"internalType": "uint256[2]",
					"name": "info",
					"type": "uint256[2]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "bytes",
					"name": "",
					"type": "bytes"
				}
			],
			"name": "onERC721Received",
			"outputs": [
				{
					"internalType": "bytes4",
					"name": "",
					"type": "bytes4"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_pid",
					"type": "uint256"
				},
				{
					"internalType": "uint256[]",
					"name": "tokenIds",
					"type": "uint256[]"
				}
			],
			"name": "stake",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_pid",
					"type": "uint256"
				}
			],
			"name": "tokensOfOwner",
			"outputs": [
				{
					"internalType": "uint256[]",
					"name": "ownerTokens",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalStaked",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256[]",
					"name": "tokenIds",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256",
					"name": "_pid",
					"type": "uint256"
				}
			],
			"name": "unstake",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "vault",
			"outputs": [
				{
					"internalType": "uint24",
					"name": "tokenId",
					"type": "uint24"
				},
				{
					"internalType": "uint48",
					"name": "timestamp",
					"type": "uint48"
				},
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
]
var account = null;
var contract = null;
var vaultcontract = null;

const apikey = "DDRDSA7U9VHDDCQGJBZ218MYWRS21NYDS4";
const NFTCONTRACT = "0x972b859685D4f5706632C36A98bdb796001072E7";
const STAKINGCONTRACT = "0x0f928F5154358Ff4E921445790A64f0eACB382e5"
const endpoint = "https://api.etherscan.io/api"
const nftpng = "https://gateway.pinata.cloud/ipfs/QmWGBMo1uuKxypThVQwbfnYo2fHfVBCAWoGcKBQUyHR4BS/";

const providerOptions = {
	binancechainwallet: {
		package: true
	  },
	walletconnect: {
		package: WalletConnectProvider,
		options: {
		  infuraId: "4fa6543ce1734c0eb8fccfd6c8d845fb"
		}
	  },
	  walletlink: {
		package: WalletLink, 
		options: {
		  appName: "turtle people yatch club", 
		  infuraId: "4fa6543ce1734c0eb8fccfd6c8d845fb", 
		  rpc: "https://mainnet.infura.io/v3/4fa6543ce1734c0eb8fccfd6c8d845fb", 
		  chainId: 1, 
		  appLogoUrl: null, 
		  darkMode: true 
		}
	  },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  theme: "dark",
  cacheProvider: true,
  providerOptions 
});

async function connectwallet() { 
  var provider = await web3Modal.connect();
  var web3 = new Web3(provider); 
  await window.ethereum.send('eth_requestAccounts'); 
  var accounts = await web3.eth.getAccounts(); 
  account = accounts[0]; 
  document.getElementById('wallet-address').textContent = account; 
  contract = new web3.eth.Contract(ABI, NFTCONTRACT);
  vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);

}
async function mint() { 
    var _mintAmount = Number(document.querySelector("[name=amount]").value); 
    var mintRate = Number(await contract.methods.cost().call()); 
    var totalAmount = mintRate * _mintAmount; 
  contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
} 

async function stakeit() {
	var tokenids = Number(document.querySelector("[name=stkid]").value);
	vaultcontract.methods.stake([tokenids]).send({from: account});
}

async function unstakeit() {
	var tokenids = Number(document.querySelector("[name=stkid]").value);
	vaultcontract.methods.unstake([tokenids]).send({from: account});
}

async function claimit() {
	var tokenids = Number(document.querySelector("[name=claimid]").value);
	vaultcontract.methods.claim([tokenids]).send({from: account});
}

async function verify() {
	var getbalance = Number(await vaultcontract.methods.balanceOf(account).call());
	document.getElementById('stakedbalance').textContent = getbalance; 
}

async function enable() {
	contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({from: account});
  }

class App extends Component {
constructor() {
super();
this.state = {
  balance: [],
  nftdata: [],
};
}

async componentDidMount() {

await axios.get((endpoint + `?module=stats&action=tokensupply&contractaddress=${NFTCONTRACT}&apikey=${apikey}`))
.then(outputa => {
        this.setState({
            balance:outputa.data
        })
        console.log(outputa.data)
    })

await axios.get((endpoint + `?module=account&action=tokennfttx&contractaddress=${NFTCONTRACT}&page=1&offset=100&tag=latest&apikey=${apikey}`))
.then(outputb => {
  const { result } = outputb.data
        this.setState({
            nftdata:result
        })
        console.log(outputb.data)
    })
}

render() {
const {balance} = this.state;
const {nftdata} = this.state
  return (
    <div className="App">
		<Button onClick={connectwallet} style={{marginBottom:"5px", marginTop:"5px", marginRight:"3px"}}>Connect Wallet</Button>
		<Button onClick={enable}>Enable Staking</Button>

 <div className='container'>
<div className='row'>
      <form class= "gradient col-lg5 mt=5" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #00d370"}}>
        <h4 style={{color:"#ffffff"}}> Turtle People Yatch Club </h4>
        <h5 style={{color:"#ffffff"}}>Please connect your wallet</h5>
        <div class="card" id='wallet-address' style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
          <label style={{color:"#000000"}} for="floatingInput">Wallet Address</label>
          </div>
          <div class="card" style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>

          <input type="number" name="amount" defaultValue="1" min="1" max="20"/>
          <label style={{color:"#000000"}}>Please select the amount of NFTs to mint.(0.005 eth each)</label>
          <Button onClick = {mint}>MINT</Button>
          <h2> NFTS Minted so far= {balance.result} /10,000</h2>
          </div>
        <label style={{color:"#ffffff"}}>Price .005 ETH each mint.</label>
      </form>

	  <form class="gradient col-lg-3 mt-5" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"5px"}}>
    <h4 style={{color:"#FFFFFF"}}>Staking Vault</h4>
    <h5 style={{color:"#FFFFFF"}}>Please connect your wallet</h5>
      <div class="card" style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
      <input type="number" name="stkid"/>
      <label >Input NFT ID</label>
      <Button onClick = {stakeit}> (staking) ACTIVATES AT 5,000 MINTS</Button>
	  <Button onClick = {unstakeit}>UNSTAKE</Button>
          
          </div>
        
      </form>

	  <form class="gradient col-lg-3 mt-5" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"5px"}}>
    <h4 style={{color:"#FFFFFF"}}>NFT Vault Options</h4>
	<h5 style={{color:"#FFFFFF"}}>Verify Amount Staked</h5>
	<Button onClick={verify}>Verify</Button>
	<div class="card" id='stakedbalance' style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
      <label for="floatingInput">NFT Balance</label>
      </div>
      <div class="card" style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
      <input type="number" name="claimid"/>
      <label >Input NFT ID</label>
	  <Button onClick={claimit}>Claim Rewards</Button>
      </div>
  </form>

      <div className="row items mt-3">
      <div className="ml-3 mr-3" style={{display: "inline-grid",gridTemplateColumns: "repeat(4, 5fr)",columnGap: "10px"}}>
  {nftdata.map(result => {
	  return (
			<div className="card">
            		<div className="image-over">
					<img className="card-img-top" src={nftpng + result.tokenID +'.png'} alt="" />
					</div>
					<div className="card-caption col-12 p-0">
                    	<div className="card-body">
							<h5 className="mb-0">Turtle People Yatch CLub #1{result.tokenID}</h5>
              <h5 className="mb-0 mt-2">Owner Wallet:<p style={{color:"#39FF14",fontWeight:"bold",textShadow:"1px 1px 2px #000000"}}>{result.to}</p></h5>
                    	<div className="card-bottom d-flex justify-content-between">
							<Button className="btn btn-bordered-white btn-smaller mt-3">
								<i className="mr-2" />Buy / sell button activated once collection sold out. to keep floor at 1eth 
							</Button>
							</div>
					</div>
                </div>
            </div>
        
        );
    })}
    </div>
</div>
          </div>
          </div>
        </div>
                          );  
            };      
 }


export default App;
