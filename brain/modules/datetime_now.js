var hourToText = require('../../external/hourToText');
var Random = require('random-js');

exports.run = function(commandModel){
    var r = new Random();
    var value = r.integer(0, (commandModel[0].answers.length-1));
    
    
    return commandModel[0].answers[value] +", "+ hourToText.run();
}