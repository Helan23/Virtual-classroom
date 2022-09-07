const mysql = require('mysql2')

var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:courseid/attatchment',function(req,res)
    {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'helan@23',
            database: 'nodelogin'
    });
var attatchmentid=Date.now();
var attatchmentname=req.body.attatchmentname;
var attatchmenttype=req.body.attatchmenttype;
var link=req.body.link;
var courseid = req.params.courseid;
connection.query("Insert into `attatchmentlist`(`attatchmentid`,`attatchmentname`,`attatchmenttype`,`link`,`courseid`) values "+"("+"\""+attatchmentid+"\","
+"\""+attatchmentname+ "\","+"\""+attatchmenttype+"\","+"\""+link+"\","+"\""+courseid+"\")",(err,rows,fields)=>
{
    if(err) {
        throw err;
        res.json({"result":"fail"})
      }
      else{
        res.json({"result":"success"})
      }
});
connection.end();
});

router.get('/course/:courseid/all',function(req, res, next) {
    var courseid=req.params.courseid;
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'helan@23',
      database: 'nodelogin'
    })
    var result ;
    connection.connect();
    connection.query("select * from `attatchmentlist` where `courseid`= '"+req.params.courseid+"'",(err,rows,fields)=> 
    {
        if(err) throw err
        console.log('The solution is: ', rows)
        res.json(rows);
    });
connection.end();
console.log(result);

});
module.exports=router;