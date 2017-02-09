var mongoose = require('mongoose');
var fs       = require('fs');

var Schema = mongoose.Schema;
var ImgSchema = new Schema({ 
     archived: Boolean, 
     subfolder: String,
     archivesLink: String,
     points: Number
});

// our model
var Img = mongoose.model('Img', ImgSchema);

exports.all = function(condObj) {
  return Img.find(condObj, function(err, imgs) { 
  });
}

exports.update = function(id, currentImgPath, protocol, host) {
    
    
    var source = fs.createReadStream('./assets/'+currentImgPath);
    var dest = fs.createWriteStream('./archives/'+id+".jpg");

    source.pipe(dest);
    source.on('end', function() { 
      fs.unlink('./assets/'+currentImgPath, function() {
       console.log("img moved to archives");
      })  
    });
    source.on('error', function(err) { 
      console.log("error moving file to archives")  
    });

    Img.update({ "_id": id}, { $set: { "subfolder": "/archives/"+id,"archived": true,  "archivesLink": protocol + '://'+ host +"/archives/"+id, points: 0 } }, function() {      
    });
    
}

exports.updateMulti = function(ids) {
  Img.update({ "_id": { $in : ids }}, { $inc : { points: 1 } }, { multi: true }, function() {
  }); 
}

