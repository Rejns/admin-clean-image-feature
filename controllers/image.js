//controller responsible for images

var express = require('express');
var router  = express.Router();
var Img     = require('../models/image');

router.get('/', function(req, res) {
  
  Img.all({}).then(function(imgs) {

     var images = [];
     imgs.forEach(function(img) {
          images.push({id: img._id, src: img.subfolder, points: img.points, archived: img.archived});
     });

     res.json(images);

  });
  
});

router.post('/', function(req, res) {

    //prepare data for updating

    var id = req.body.params.id;
    var ids = [];
    var currentImgPath = req.body.params.src;
    var protocol = req.protocol;
    var host = req.get('host');

    for(var i = 0; i < req.body.params.photos.length; i++) {
      ids.push(req.body.params.photos[i].id);
    }

    //todo with promises
    //response should be send after update is finished

    Img.update(id, currentImgPath, protocol, host);
    Img.updateMulti(ids);
    res.send();
});

module.exports = router;