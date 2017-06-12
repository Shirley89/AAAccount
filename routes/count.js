/**
 * Created by shirley on 27/05/2017.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('count', { title: 'AA Account' });
});
router.get('/:index', function(req, res, next) {
    res.render('count', { title: 'AA Account', index: req.params.index });
});

module.exports = router;