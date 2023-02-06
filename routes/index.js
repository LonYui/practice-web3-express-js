var express = require('express');
var router = express.Router();

router.get('/hello_world', (req, res) => {
  res.render('hello_world');
});

module.exports = router;
