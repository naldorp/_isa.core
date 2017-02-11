var mongoose = require('mongoose');

//model definition
var commandS = new mongoose.Schema({
   questions: [String],
   isComplex: {
       type: Boolean,
       default: false
   },
   answers: [String],
   module: String
});

module.exports = mongoose.model('Command',commandS);