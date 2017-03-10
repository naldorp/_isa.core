var NLP = require('natural');
var removeSpecial = require('../external/removeSpecialChars');

require('draftlog').into(console);

var mod = require('./modules');
var __classifier = undefined;
var __multiSessionData = [];

var brain = {

    init: function(model) {
        model.find({}, function(err, skills) {
            if (err) console.error(err);

            //create classifier
            __classifier = new NLP.LogisticRegressionClassifier();

            skills.forEach(function(item) {
                for (var i = 0; i < item.model.length; i++) {
                    __classifier.addDocument(item.model[i], item.name);
                }
            });
            
            __classifier.train();
        });

    },
    run: function(token, command, model, callback) {

        command = removeSpecial.run(command);

        var session = this.getMultiSessionToken(token);

        if (session != undefined) {
            mod.run(token, command, session.skill, function(message) {
                callback(message);
            })
        }
        else {
            //get skill
            var skill = __classifier.classify(command);

            if (__classifier.getClassifications(command)[0].value >= 0.6) {
                model.find({
                    name: skill
                }, function(err, result) {
                    if (err) console.log(err);

                    if (result.length > 0) {
                        var _item = result[0];

                        mod.run(token, command, _item, function(message) {
                            callback(message);
                        });
                    }
                    else {
                        callback("Desculpe, não entendi.");
                    }
                });
            }
            else {
                callback("Desculpe, não entendi.");
            }
        }
    },
    startMultiSession: function(token, skill) {
        var data = this.getMultiSessionToken(token);
        if (data == undefined) {
            __multiSessionData.push({
                token: token,
                skill: skill
            });
        }
        else {
            data.skill = skill;
        }
    },
    finishMultiSession: function(token) {
        var data = this.getMultiSessionToken(token);
        __multiSessionData.splice(__multiSessionData.indexOf(data), 1);
    },
    getMultiSessionToken: function(token) {
        var result = undefined;
        __multiSessionData.forEach(function(item) {
            if (item.token == token) {
                result = item;
            }
        });

        return result;
    },

}

module.exports = brain;
