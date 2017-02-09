var mongoose = require('mongoose');
var fs       = require('fs');
var path     = require('path');
var db       = require('./dbconfig');

db.connect(db.mongodbUri, db.options);

var Schema = mongoose.Schema;
var ImgSchema = new Schema({ 
     archived: Boolean, 
     subfolder: String,
     archivesLink: String,
     points: Number
});

// our model
var Img = mongoose.model('Img', ImgSchema);

//remove existing data from collection then start seeding
Img.remove({}, function() {
    seed('./assets/images');
});

//save paths of photos into database
function seed(startPath){

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename); //recurse
        }
        else
        {
            var img = new Img();
            img.subfolder = filename;
            img.archived = false;
            img.points = 1;
            img.save(function(err, img) {
              console.log("saved img data from "+filename);
            });
        }
    };
};

