const mysql = require('mysql2')
var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) 
    {
    res.send('respond with a resource');
    });
router.get('/:courseid', function(req, res, next) {
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'helan@23',
        database: 'nodelogin'
    })
    var result ;
    connection.connect()
    connection.query("select * from `coursetable` where courseid = '"+req.params.courseid +"'", (err, rows, fields) => 
    {
        if (err) throw err
        console.log('The solution is: ', rows[0])
        res.json(rows[0]);
    });
        connection.end();
        console.log(result); 
});


router.get('/all',function(req, res, next) {
   // var courseid=req.params.courseid;
   console.log('Hai');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'helan@23',
      database: 'nodelogin'
    })
    var result ;
    connection.connect();
    connection.query("select * from `coursetable`",(err,rows,fields)=> 
    {
        if(err) throw err
        console.log('The solution is: ', rows[0])
        res.json(rows);
    });
connection.end();
console.log(result);

});

router.post('/',function(req,res)
{
    var courseid=req.body.courseid   //questionid=Date.now()
    var coursename=req.body.coursename
    console.log(courseid);
    console.log(coursename);
    const connection = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'helan@23',
            database: 'nodelogin'
        })
    connection.connect()
    connection.query("Insert into `coursetable`(`courseid`,`coursename`) values "+"("+"\""+courseid+"\","
    +"\""+coursename+"\")",(err,rows,fields)=>
    {
        if(err)
        {
            res.json({"result":"fail"})
        }
        else
        {
        res.json({"result":"success"});
        }

    });
});
router.get('/:courseid/question', function(req, res, next) {
    const connection = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'helan@23',
            database: 'nodelogin'
        })
        var result ;
        connection.connect()
        connection.query("select * from `questiontable` where courseid = '"+req.params.courseid +"'", (err, rows, fields) => 
        {
            if (err) throw err
            console.log('The solution is: ', rows[0])
            res.json(rows);
        });
            connection.end();
            console.log(result);            
    });
module.exports = router;
