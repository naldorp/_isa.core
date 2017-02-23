var express = require('express');
var router = express.Router();
var brain = require('../brain');
var config = require('../config');
var request = require('request');
var removeSpecial = require('../external/removeSpecialChars');

/* GET command page. */
router.get('/', function(req, res, next) {
    brain.run(req.query.msg, req.models.Command, function(result) {
        var encodedResult = encodeURIComponent(result);
        var token = (new Date()).getTime();

        var formattedURL = require("sprintf-js").sprintf(config.TTS.tts_url, encodedResult, token);

        request.get(formattedURL).pipe(res);
    });

});

//list
router.get('/commands', function(req, res, next) {
    req.models.Command.find({}, function(err, result) {
        if (err) return next(err);
        res.json(result);
    });
});

//details
router.get('/commands/:id', function(req, res, next) {
    req.models.Command.find({
        _id: req.params.id
    }, function(err, result) {
        if (err) return next(err);
        res.json(result[0]);
    });
});

//edit{id}
router.put('/commands/:id', function(req, res, next) {
    if (!req.params.id) return next(new Error("No command id"));

    for (var i = 0; i < req.body.questions.length; i++) {
        req.body.questions[i] = removeSpecial.run(req.body.questions[i]);
    }

    req.models.Command.findByIdAndUpdate(
        req.params.id, {
            $set: req.body
        },
        function(err, doc) {
            if (err) return next(err);
            res.send(doc);
        }
    );
});

//new{data}
router.post('/commands', function(req, res, next) {
    if (!req.body.questions) return next(new Error("No command data"));
    var command = req.body;

    for (var i = 0; i < command.questions.length; i++) {
        command.body.questions[i] = removeSpecial.run(command.questions[i]);
    }
    req.models.Command.create(command, function(err, response) {
        if (err) return next(err);
        res.send(response);
    });
});

router.delete('/commands/:id', function(req, res, next) {
    if (!req.params.id) return next(new Error("No command id"));

    req.models.Command.findByIdAndRemove(
        req.params.id, {
            $set: req.body
        },
        function(err, doc) {
            if (err) return next(err);
            res.send(doc);
        }
    );
});

module.exports = router;
