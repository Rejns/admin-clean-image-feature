//this file's purpose is to load all controllers
var express = require('express');
var router  = express.Router();

//use different controller for each route
router.use('/images', require('./image'));
router.use('/archives', require('./archives'));

module.exports = router;