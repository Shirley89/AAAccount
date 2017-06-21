var express = require('express');
var router = express.Router();

var asset = require('../config/assets/assets')['index'];

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = {
        title: 'AA Account',
        css: JSON.stringify(asset['css']),
        js: JSON.stringify(asset['js'])
    };
    res.render('index', data);
});

module.exports = router;
