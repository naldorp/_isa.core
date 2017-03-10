var mongoose = require('mongoose');

//model definition
var skillS = new mongoose.Schema({
   name: String,
   model: [String],
   entities:[{
       type: {type:String},
       isRequired: Boolean,
       questions:[String],
       defaultValue: String
   }],
   answers:[String],
   module: String
});

module.exports = mongoose.model('Skill', skillS);