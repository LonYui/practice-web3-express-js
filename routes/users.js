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
      },
      {
        "internalType": "uint256",
        "name": "_status",
        "type": "uint256"
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
      }
    ],
    "name": "deleteUser",
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
      },
      {
        "internalType": "uint256",
        "name": "_status",
        "type": "uint256"
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
    "type": "function"
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
    "type": "function"
  }
]; // 合約的 ABI（接口說明）
const contractAddress = '0x592e5747fF6481323F7bD59F3B9D875AeAa3Df45'; // 合約的地址
const contract = new web3.eth.Contract(contractAbi, contractAddress);
const privateKey = 'd12641050545136f0e86ba2c695a1e97c45715c01257220bc7c24e00f601b1d3'
const pubKey = '0x1C9D9fB55779499F0ebCf700ac4b6EC183DD7b2a'



let 帳號表 = []
let users = []

sync_chaindata()
router.get('/', async (req, res) => {
  await sync_chaindata()
  res.render('user_management',{users,contractAddress});
})

// router.get('/:account', async (req, res) => {
//   // const user = users.find(user => user.帳號 === req.params.account)
//   const user = await contract.methods.users(req.params.account).call()
//   if (!user) {
//     res.status(404).send('User not found')
//     return
//   }
//   res.json(user)
// })

router.post('/', async (req, res) => {
  const send = async() => {
    const tx = {
      from:pubKey,
      to:contractAddress,
      // gas:50000,
      gas:303146,
      data:contract.methods.createUser(req.body.account, req.body.password, req.body.status).encodeABI()
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
  await send()
  return
})

router.put('/:account', (req, res) => {
  const userIndex = users.findIndex(user => user.帳號 === req.params.account)
  if (userIndex === -1) {
    res.status(404).send('User not found')
    return
  }
  users[userIndex] = { ...users[userIndex], ...req.body }
  res.json(users[userIndex])
})

router.delete('/:account', (req, res) => {
  const userIndex = users.findIndex(user => user.帳號 === req.params.account)
  if (userIndex === -1) {
    res.status(404).send('User not found')
    return
  }
  const user = users[userIndex]
  users = users.filter(user => user.帳號 !== req.params.account)
  res.json(user)
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
