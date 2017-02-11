var express = require('express');
var router = express.Router();
var brain = require('../brain');
var config = require('../config');
var request = require('request');

/* GET command page. */
router.get('/', function(req, res, next) {
    brain.run(req.query.msg, req.models.Command, function(result) {
        var encodedResult = encodeURIComponent(result);
        var token = (new Date()).getTime();
        
        var formattedURL = require("sprintf-js").sprintf(config.TTS.tts_url,encodedResult,token);
        
        request.get(formattedURL).pipe(res);
    });

});

module.exports = router;
