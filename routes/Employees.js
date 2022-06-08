var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

//---Show Table
router.get('/List', function (req, res, next){
    conn.query("SELECT * FROM NewEmployees", (err, NewEmployees) => {
        if (err) throw err;
        else{
            conn.query("SELECT COUNT(*) AS value FROM NewEmployees", (err, newempcount) => {
                if (err) throw err;
                else{
                    conn.query("SELECT AVG(age) AS value FROM NewEmployees", (err, newempavgagg) => {
                        if (err) throw err;
                        else{
                            conn.query("SELECT MIN(age) AS value FROM NewEmployees", (err, agemin) => {
                                if (err) throw err;
                                else{
                                    conn.query("SELECT MAX(age) AS value FROM NewEmployees", (err, agemax) => {
                                        if (err) throw err;
                                        else{
                                            res.render('Employees-List', {
                                                NewEmpTable: NewEmployees,
                                                NewEmpCount: newempcount[0].value,
                                                NewEmpAvgAgg: newempavgagg[0].value,
                                                YougestAge: agemin[0].value,
                                                OldestAge: agemax[0].value
                                            });

                                        }
                                    });
                                }               
                            });    
                        }
                    });
                }
            });
        }
    });
});


//---Edit
router.get('/Edit/:id', function (req, res, next){
    let varSQL = "SELECT * FROM NewEmployees WHERE id=" + req.params.id;

    conn.query(varSQL, function(err, rows){
        if(err){
            //
        }else{
            res.render('Employees-Edit',{
                data: rows[0]
            });
        }
    });
});
//---Update
router.post('/Update', function (req, res, next){
    let varSQL =    "UPDATE NewEmployees SET frst_nm = '" + req.body.FirstName +
                    "', lst_nm = '" + req.body.LastName +
                    "', age = '" + req.body.Age +
                    "', address = '" + req.body.Address +
                    "', tel_no = '" + req.body.Telephone +
                    "', email_address = '" + req.body.EmailAddress +
                    "' WHERE id=" + req.body.id;

    conn.query(varSQL, function(err, rows){
        if(err){
            //
        }else{
            res.redirect('/Employees/List');
        } 
    });
});

//---To Display the New Employee Create Screen
router.get('/Create', function (req, res, next){
        res.render('Employees-Add',{
        });
});

//---Add
router.post('/Add', function (req, res, next){
    let varSQL =    "INSERT INTO NewEmployees (frst_nm, lst_nm, age, address, tel_no, email_address) VALUES('" + req.body.FirstName +
                    "', '" + req.body.LastName +
                    "', '" + req.body.Age +
                    "', '" + req.body.Address +
                    "', '" + req.body.Telephone +
                    "', '" + req.body.EmailAddress +
                    "')";

    conn.query(varSQL, function(err, rows){
        if(err){
            //
        }else{
            res.redirect('/Employees/List');
        } 
    });
});

//---Delete
router.get('/Delete/:id', function (req, res, next){
    let varSQL = "DELETE FROM NewEmployees WHERE id=" + req.params.id;

    conn.query(varSQL, function(err, rows){
        if(err){
            //
        }else{
            res.redirect('/Employees/List');
        } 
    });
});


module.exports = router;