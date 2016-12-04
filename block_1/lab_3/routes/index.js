var express = require('express');
var router = express.Router();


router.all('/', function(req, res, next) {

  res.render('index', {
    brands_button_href: 'brands',
    });
});




module.exports = router;
