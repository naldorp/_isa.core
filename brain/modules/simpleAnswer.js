var Random = require('random-js');
var lastAnswer = -1;
exports.run = function(commandModel){
    if(commandModel[0].answers.length <= 2)
        return commandModel[0].answers[0];
    
    var r = new Random();
    var value = r.integer(0, (commandModel[0].answers.length-1)); 
    if(lastAnswer != value){
        lastAnswer = value
    }
    else{
        while(lastAnswer == value){
            value = r.integer(0, (commandModel[0].answers.length-1)); 
        }
    }
    
    return commandModel[0].answers[value];
}


