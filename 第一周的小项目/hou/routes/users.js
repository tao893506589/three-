var express = require('express');
var router = express.Router();
var user = require('../controller/user-router')

/* GET users listing. */
router.post('/signup', user.signup );
router.post('/signin',user.signin)
router.post('/issignin',user.issignin)

module.exports = router;
