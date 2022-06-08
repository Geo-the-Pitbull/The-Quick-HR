var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

//---Show table
router.get('/List', function (req, res, next){
    let varSQL = "SELECT * FROM EmployeePersonalInfos";
     
    conn.query(varSQL, function(err, rows)     {
         if(err){
             //
         }else{
             res.render('PersonalInfos-List',{
                 data: rows
             });
         }
     });
 });

 module.exports = router