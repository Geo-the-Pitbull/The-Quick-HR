var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');
 
 
//---Display the Login Page
router.get('/', function(req, res, next){    
    
    res.render('login', {
        title: 'Login',
        email: '',
        password: ''    
    });
});
 
 
//---Authenticate User
router.post('/login', function(req, res) {
       
    var email = req.body.email;
    var password = req.body.password;
   
    connection.query('SELECT * FROM User WHERE email = ? AND BINARY password = ?', [email, password], function(err, rows, fields) {
        if (rows.length <= 0) {
            req.flash('error', 'Invalid credentials Please try again!')
            res.redirect('/login')
        }
        else { // if login found
            //Assign session variables based on login credentials                
            req.session.loggedin = true;
            req.session.frst_name = rows[0].frst_nm;
            req.session.lst_name = rows[0].lst_nm;
            req.session.is_admin = rows[0].is_admin;
            //console.log(req.session);
            //if(req.session.loggedin=true){
            //   checkState="1";
            //}
            res.redirect('/Employees/List');
        }          
    });  
});
 
//---Logout user
router.get('/logout', function (req, res) {
  req.session.destroy();
  req.flash('success', 'Enter Your Login Credentials');
  res.redirect('/auth/login');
});

module.exports = router;