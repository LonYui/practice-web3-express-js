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

let users = [
  {
    "帳號": "user1",
    "密碼": "password1",
    "狀態": "啟用"
  },
  {
    "帳號": "user2",
    "密碼": "password2",
    "狀態": "禁用"
  },
  {
    "帳號": "user3",
    "密碼": "password3",
    "狀態": "啟用"
  }
]

// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })

router.get('/', (req, res) => {
  res.json(users)
})

router.get('/:account', (req, res) => {
  const user = users.find(user => user.帳號 === req.params.account)
  if (!user) {
    res.status(404).send('User not found')
    return
  }
  res.json(user)
})

router.post('/', (req, res) => {
  const user = req.body
  users.push(user)
  res.json(user)
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

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
module.exports = router;
