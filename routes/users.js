// var express = require('express');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;

const express = require('express')
var router = express.Router();
// const app = express()
// const port = 3000


const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('HTTP://localhost:8545'));
// web3.setProvider(new web3.providers.HttpProvider('https://ethereum-sepolia-rpc.allthatnode.com'));
// const contractAbi = [
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "accounts",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "name": "users",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "account",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "password",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "status",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "createdAt",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "updatedAt",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [],
//     "name": "initialize",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_account",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_password",
//         "type": "string"
//       }
//     ],
//     "name": "createUser",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_account",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_password",
//         "type": "string"
//       }
//     ],
//     "name": "updateUser",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_account",
//         "type": "string"
//       }
//     ],
//     "name": "deleteUser",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "getAccountLength",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   }
// ];//0x08abf1bC52427fe8b648cB6d70a7c646ef0C4411 // 合約的 ABI（接口說明）V1
const contractAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "accounts",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "string",
        "name": "account",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "status",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "updatedAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "helloV2",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_account",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "createUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_account",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "updateUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_account",
        "type": "string"
      }
    ],
    "name": "deleteUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAccountLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];//0x08abf1bC52427fe8b648cB6d70a7c646ef0C4411 // 合約的 ABI（接口說明）V2

// const contractAbi = [
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_account",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_password",
//         "type": "string"
//       }
//     ],
//     "name": "createUser",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_account",
//         "type": "string"
//       }
//     ],
//     "name": "deleteUser",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_account",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_password",
//         "type": "string"
//       }
//     ],
//     "name": "updateUser",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "accounts",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "getAccountLength",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "name": "users",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "account",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "password",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "status",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "createdAt",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "updatedAt",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ]; // 合約的 ABI（接口說明） //0x5592cd2c816e86E4F9f2f9D3AFc2e1c4b8E01fDc

// const proxyadminAddress = '0x4f312ec33adb3d16d358deac8ef4a699a829eb1d';//proxy管理員
const proxyadminAddress = '0x8964Eb9793747C7204603a2F6B3AEE11dCECB9e4';//proxy管理員
const proxyadminAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract TransparentUpgradeableProxy","name":"proxy","type":"address"},{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeProxyAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract TransparentUpgradeableProxy","name":"proxy","type":"address"}],"name":"getProxyAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract TransparentUpgradeableProxy","name":"proxy","type":"address"}],"name":"getProxyImplementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract TransparentUpgradeableProxy","name":"proxy","type":"address"},{"internalType":"address","name":"implementation","type":"address"}],"name":"upgrade","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract TransparentUpgradeableProxy","name":"proxy","type":"address"},{"internalType":"address","name":"implementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeAndCall","outputs":[],"stateMutability":"payable","type":"function"}]
const proxyadminContract = new web3.eth.Contract(proxyadminAbi, proxyadminAddress);
// const proxyAddress = '0x0CC3bF148Be8f776904E1f539552d55C0b5AA983';//proxy 測試練
// const proxyAddress = '0xB104c407df01FE7D8136dA1864E1835321250674';//proxy 1
const proxyAddress = '0xFE54C57E0a857c2C111373dF8E5f79566CAF3A63';//proxy 2
const contractAddress = proxyAddress; // 下方串接合約的地址
const contract = new web3.eth.Contract(contractAbi, contractAddress);
const privateKey = 'd12641050545136f0e86ba2c695a1e97c45715c01257220bc7c24e00f601b1d3'
const pubKey = '0x1C9D9fB55779499F0ebCf700ac4b6EC183DD7b2a'



let 帳號表 = []
let users = []

router.get('/', async (req, res) => {
  await sync_chaindata()
  const currentAddress = await proxyadminContract.methods.getProxyImplementation(proxyAddress).call()
  res.render('user_management',{users,contractAddress,currentAddress});
})

// router.get('/:account', async (req, res) => {
//   // const user = users.find(user => user.帳號 === req.params.account)
//   const user = await contract.methods.users(req.params.account).call()
//   if (!user) {
//     res.status(404).send('找不到使用者 #memory')
//     return
//   }
//   res.json(user)
// })

router.post('/', async (req, res) => {
  const userIndex = users.findIndex(user => user.account === req.body.account)
  if (userIndex !== -1) {
    // res.status(404).send({"msg":'使用者存在 #memory'})
    res.json({status: false, resultMessage: '使用者存在 #memory'})
    return
  }
  const send = async() => {
    const tx = {
      from:pubKey,
      to:contractAddress,
      // gas:50000,
      gas:303146,
      data:contract.methods.createUser(req.body.account, req.body.password).encodeABI()
    }
    const signature = await web3.eth.accounts.signTransaction(tx,privateKey)
    web3.eth.sendSignedTransaction(signature.rawTransaction)
        .on(
        "receipt", (receipt) => {
          console.log(receipt)
        }
        )
        .catch(error => {
          console.error(error)
        })

  }
  // res.status(200).send(await send())
  await send()
  res.json({status: true, resultMessage: '新增成功'})
})

router.put('/:account', async (req, res) => {
  const userIndex = users.findIndex(user => user.account === req.params.account)
  if (userIndex === -1) {
    res.json({status: false, resultMessage: '找不到使用者 #memory'});
    return
    // res.status(404).send('找不到使用者 #memory')
  }
  // users[userIndex] = { ...users[userIndex], ...req.body }
  const send = async() => {
    const tx = {
      from:pubKey,
      to:contractAddress,
      // gas:50000,
      gas:303146,
      data:contract.methods.updateUser(req.body.account, req.body.password).encodeABI()
    }
    const signature = await web3.eth.accounts.signTransaction(tx,privateKey)
    web3.eth.sendSignedTransaction(signature.rawTransaction)
        .on(
            "receipt", (receipt) => {
              console.log(receipt)
            }
        )
        .catch(error => {
          console.error(error)
        })

  }
  // res.status(200).send(await send())
  await send()
  res.json({status: true, resultMessage: '更新成功'});
})

router.delete('/:account', async (req, res) => {
  const userIndex = users.findIndex(user => user.account === req.params.account)
  if (userIndex === -1) {
    // res.status(404).send('找不到使用者 #memory')
    res.json({status: false, resultMessage: '找不到使用者 #memory'})
    return
  }
  // const user = users[userIndex]
  // users = users.filter(user => user.帳號 !== req.params.account)
  const send = async() => {
    const tx = {
      from:pubKey,
      to:contractAddress,
      // gas:50000,
      gas:303146,
      data:contract.methods.deleteUser(req.params.account).encodeABI()
    }
    const signature = await web3.eth.accounts.signTransaction(tx,privateKey)
    web3.eth.sendSignedTransaction(signature.rawTransaction)
        .on(
            "receipt", (receipt) => {
              console.log(receipt)
              return receipt
            }
        )
        .catch(error => {
          console.error(error)
          return error
        })
  }
  // res.status(200).send(await send())
  await send()
  res.json({status: true, resultMessage: '刪除成功'});
})



async function sync_chaindata(){
  users = []
  帳號表 = []
  var i = 0;
  var limit = 100;

  while (i<limit){
    var result
    try {
      result = await contract.methods.accounts(i).call()
    }catch (e){
      break
    }
    帳號表.push(result)
    const result2 = await contract.methods.users(result).call()
    users.push(result2)
    i++
  }

}
module.exports = router;
