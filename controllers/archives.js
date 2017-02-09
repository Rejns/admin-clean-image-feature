//controller responsible for archives

var express = require('express');
var router  = express.Router();
var Img     = require('../models/image');
var path    = require('path');

router.get('/', function(req, res) {
  
  Img.all({ "archived": true }).then(function(imgs) {
    var images = [];
     imgs.forEach(function(img) {

          if(img.archived === true)
            images.push({id: img._id});
     });

     res.json(images);
  })

});

router.get('/:id', function(req, res) {
  res.sendFile(path.resolve("archives/"+req.params.id+".jpg"));
});

module.exports = router;