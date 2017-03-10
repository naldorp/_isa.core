var brain = require('../../../../brain');
var request = require('request');
var fs = require('fs');
var path = require('path');

var _config = {
    apiKey: '38d00a4e13fe4dcb933171227171003',
    weatherApi: 'http://api.apixu.com/v1/current.json?key=%1$s&q=%2$s'
}

exports.run = function(token, skill, callback) {

    var result = checkEntities(token, skill);

    if (result.isValid) {
        brain.finishMultiSession(token);

        var location = skill.entities[0].value;
        var date = skill.entities[1].value;

        var conditions = JSON.parse(fs.readFileSync(path.join(__dirname, './conditions.json'), 'utf-8'));

        var locationUrl = require("sprintf-js").sprintf(_config.weatherApi, _config.apiKey, location);
        request(locationUrl, function(err, response, body) {
            if (err) console.log(err);

            var data = JSON.parse(body);

            if (date == "Hoje" || (date.toDateString != undefined && date.toDateString() == new Date().toDateString())) {
                var message = data.current.condition.text;
                conditions.forEach(function(item) {
                    if (data.current.condition.code == item.code) {
                        console.log(item.code);
                        for (var i = 0; i < item.languages.length; i++) {
                            if (item.languages[i].lang_name == "Portuguese") {
                                console.log(item.languages[i]);
                                if (data.current.is_day == 1) {
                                    message = item.languages[i].day_text;
                                }
                                else {
                                    message = item.languages[i].night_text;
                                }
                            }
                        }
                    }
                });
                callback(message);
            }
            else {
                callback('not this time motherfucker');
            }
        });
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

        if (item.isRequired) {
            brain.startMultiSession(token, skill);
            result.isValid = false;
            result.message = item.questions[0];
            break;
        }
        else {
            //load default value
            item['value'] = item.defaultValue;
        }
    };

    return result;
}
