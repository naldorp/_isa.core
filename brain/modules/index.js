var config = require('../../config');
var request = require('request');

var MainModule = {
    run: function(token, command, item, callback) {
        if (item.module == "") {
            item.module = "simpleAnswer";
        }
        var mod = require('./' + item.module + '.js');

        this.classifyEntities(command, item, function(err, skill) {
            if (err) console.error(err);

            callback(mod.run(token, skill));
        })
    },
    classifyEntities: function(command, skill, callback) {

        if (skill.entities.length > 0) {
            var string_entities = "";

            skill.entities.forEach(function(entity) {
                if (entity.value == undefined || entity.value == '') {
                    string_entities += entity.type + ',';
                }
            });

            string_entities += "##";
            string_entities = string_entities.replace(',##', '');

            //ask for the entities in the service
            var formattedURL = require("sprintf-js").sprintf(config.NLP.npl_helper_url, this.tokenizeMessageWords(command, skill), string_entities);

            //console.log(formattedURL);
            request.get(formattedURL, function(err, response, body) {
                if (err) console.error(err);

                if (response.statusCode == 200) {
                    var data = JSON.parse(body); //
                    //console.log(data);
                    skill.entities.forEach(function(item) {
                        if (data.entities[item.type] != undefined) {
                            item.text = data.entities[item.type].text;
                            item.value = data.entities[item.type].value;
                        }
                    });

                    //console.log(skill);

                    callback(undefined, skill);
                }
                else {
                    callback(err, undefined);
                }
            });
        }
        else {
            callback(undefined, skill);
        }
    },
    tokenizeMessageWords: function(command, skill) {
        var words = [];

        for (var i = 0; i < skill.model.length; i++) {
            var w = skill.model[i].split(' ');
            words = words.concat(w);
        }

        for (var z = 0; z < words.length; z++) {
            if (words[z].length >= 3) {
                command = command.replace(words[z], '');
            }
        }
        
        return command.trim();
    }
}

module.exports = MainModule;
