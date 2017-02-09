var mongoose = require('mongoose');
//recommended mongoose options
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbUri = "rejns:a1s2d3f4@ds145039.mlab.com:45039/admin-data";      

//connect to database
exports.options = options;
exports.mongodbUri = mongodbUri;

exports.connect = function(mongodbUri, options) {
  mongoose.connect(mongodbUri, options);  
}
