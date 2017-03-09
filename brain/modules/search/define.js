var wiki = require('wikijs');

exports.run = function(commandModel, question) {

    var argument = '';

    //check if it has argument
    if (commandModel.questions[0].search("argumento") > -1) {
        //in order to discover to argument in the question, we will remove any words that is present in the command db model
        for (var i = 0; i < commandModel.questions.length; i++) {
            var q = commandModel.questions[i].replace('argumento', '').trim();
            question = question.replace(q, '');
        }

        argument = question.trim();

        if (argument != '') {
            wiki.default().search(argument).then((data) => console.log(data));
            return "o argumento encontrado foi " + argument;
        }
        else {
            return "Desculpe, não entendi nada";
        }
    }

    return "Desculpe, não entendi bulhufas";
}
