var Random = require('random-js');
var lastAnswer = -1;
exports.run = function(token, skill){
    if(skill.answers.length <= 2)
        return skill.answers[0];
    
    var r = new Random();
    var value = r.integer(0, (skill.answers.length-1)); 
    if(lastAnswer != value){
        lastAnswer = value
    }
    else{
        while(lastAnswer == value){
            value = r.integer(0, (skill.answers.length-1)); 
        }
    }
    
    return skill.answers[value];
}


