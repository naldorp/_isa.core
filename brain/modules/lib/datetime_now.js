var hourToText = require('../../../external/hourToText');
var Random = require('random-js');

exports.run = function(commandModel){
    var r = new Random();
    var value = r.integer(0, (commandModel.answers.length-1));
    
    
    return hourToText.run();
}