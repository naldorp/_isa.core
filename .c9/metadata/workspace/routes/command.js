{"changed":true,"filter":false,"title":"command.js","tooltip":"/routes/command.js","value":"var express = require('express');\nvar router = express.Router();\n\n/* GET home page. */\nrouter.get('/', function(req, res, next) {\n  res.render('index', { title: 'Express' });\n});\n\nmodule.exports = router;\n","undoManager":{"mark":-2,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":9,"column":0},"action":"insert","lines":["var express = require('express');","var router = express.Router();","","/* GET home page. */","router.get('/', function(req, res, next) {","  res.render('index', { title: 'Express' });","});","","module.exports = router;",""],"id":1}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":4,"column":12},"end":{"row":4,"column":12},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1486575433863}