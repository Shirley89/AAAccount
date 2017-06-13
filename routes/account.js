/**
 * Created by shirley on 27/05/2017.
 */
var express = require('express');
var router = express.Router();

var asset = require('../config/assets/assets')['account'];

/* GET home page. */
router.get('/', function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('error', {message: "AA Account", error: err});
});
router.get('/:index', function (req, res, next) {
    var data = {
        title: 'AA Account',
        index: req.params.index,
        css: JSON.stringify(asset['css']),
        js: JSON.stringify(asset['js'])
    };
    res.render('account', data);
});

module.exports = router;