var removeSpecial = require('../external/removeSpecialChars');

exports.run = function(command, model, callback) {
    
    command = removeSpecial.run(command);
    
    model.find({
        questions: command
    }, function(err, result) {
        if (err) console.log(err);
        if (result.length > 0) {
            var mod = require('./modules/' + result[0].module + '.js');
            callback(mod.run(result));
        }
        else{
            callback("Desculpe, não entendi.");
        }
    });
}
