var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource 3141243214');
});

router.post('/testPost', function(req, res, next) {
  res.send('Post method return response');
});

module.exports = router;