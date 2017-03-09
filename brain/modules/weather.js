var brain = require('../../brain');

exports.run = function(token, skill) {

    var result = checkEntities(token, skill);

    if (result.isValid) {
        brain.finishMultiSession(token);
        //check the weather here
        return "claro, voce quer saber sobre o clima :" + skill.entities[0].value + " " + skill.entities[1].value;
    }
    else {
        return result.message;
    }
}

var checkEntities = function(token, skill) {
    var result = {
        skill: skill,
        isValid: true,
        message: ''
    };

    for (var i = 0; i < skill.entities.length; i++) {
        var item = skill.entities[i];

        if (item['value'] != undefined && item['value'] != '')
            continue;
        
        console.log('Question:'.item);
        
        if (item.isRequired) {
            brain.startMultiSession(token, skill);
            result.isValid = false;
            result.message = item.questions[0];
            break;
        }
        else {
            //load default value
            item['value'] = 'Valor Default'; //should implement some logic here, since this could be a loaded value
        }
    };

    return result;
}
