var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next){
    
    res.render('index',{
        page_title: 'Welcome HR Personnel'
    });

});

module.exports = router; 
