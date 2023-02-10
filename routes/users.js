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
const contractAbi = [
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
    "name": "C",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "search_word",
        "type": "string"
      }
    ],
    "name": "R",
    "outputs": [
      {
        "components": [
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
        "internalType": "struct CRUD.User[]",
        "name": "",
        "type": "tuple[]"
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
        "name": "_account",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "U",
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
    "name": "D",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const proxyadminAddress = '0x8964Eb9793747C7204603a2F6B3AEE11dCECB9e4';//proxy管理員
const proxyadminAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract TransparentUpgradeableProxy","name":"proxy","type":"address"},{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeProxyAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract TransparentUpgradeableProxy","name":"proxy","type":"address"}],"name":"getProxyAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract TransparentUpgradeableProxy","name":"proxy","type":"address"}],"name":"getProxyImplementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract TransparentUpgradeableProxy","name":"proxy","type":"address"},{"internalType":"address","name":"implementation","type":"address"}],"name":"upgrade","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract TransparentUpgradeableProxy","name":"proxy","type":"address"},{"internalType":"address","name":"implementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeAndCall","outputs":[],"stateMutability":"payable","type":"function"}]
const proxyadminContract = new web3.eth.Contract(proxyadminAbi, proxyadminAddress);
const proxyAddress = '0x21A3f4644c92E5dc9ab1A604f92e8776060552D5';//proxy 2
const contractAddress = proxyAddress; // 下方串接合約的地址
const contract = new web3.eth.Contract(contractAbi, contractAddress);
const privateKey = 'd12641050545136f0e86ba2c695a1e97c45715c01257220bc7c24e00f601b1d3'
const pubKey = '0x1C9D9fB55779499F0ebCf700ac4b6EC183DD7b2a'



let 帳號表 = []
let users = []

router.get('/:search_word?', async (req, res) => {
  users = await contract.methods.R(req.params.search_word || '').call()
  // 篩選掉空的資料 此為合約介面的 workaround
  users = users.filter(user => user.some(value => value.trim() !== '' && value!== '0'));//and so onnn
  const currentAddress = await proxyadminContract.methods.getProxyImplementation(proxyAddress).call()
  res.render('user_management',{users,contractAddress,currentAddress});
})

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
      data:contract.methods.C(req.body.account, req.body.password).encodeABI()
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
      data:contract.methods.U(req.body.account, req.body.password).encodeABI()
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
      data:contract.methods.D(req.params.account).encodeABI()
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

module.exports = router;
