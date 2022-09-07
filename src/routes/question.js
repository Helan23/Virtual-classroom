const mysql = require('mysql2')
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/',function(req,res)
{
    var questionid=Date.now()
    var courseid=req.body.courseid  
    var questiontext=req.body.questiontext
    var answer = null
    var is_answered = 0
    console.log(courseid,questiontext);
    const connection = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'helan@23',
            database: 'nodelogin'
        })
    connection.connect()
    connection.query ("Insert into `questiontable`(`questionid`,`questiontext`,`courseid`,`answer`,`is_answered`) values "+"("+"\""+questionid+"\","
    +"\""+questiontext+ "\","+"\""+courseid+"\","+"\""+answer+"\","+"\""+is_answered+"\")",(err,rows,fields)=>
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


router.post('/:questionid/answer',function(req,res)
{
  var questionid=req.params.questionid
  var answer=req.body.answer
  var is_answered=1
  console.log(questionid);
  const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'helan@23',
        database: 'nodelogin'
    })
connection.connect()

connection.query("Update questiontable set is_answered=1, answer=\""+answer+"\" where questionid=\""+questionid+"\"",(err,rows,fields)=>
  {
    if(err)
    {
      throw err;
      res.json({"result":"0"})
    }
    else
    {
      res.json({"result":"1"})
    }
  });
  connection.end();
});
router.get('/:questionid', function(req, res, next) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
  var result ;
  connection.connect()
  connection.query("select * from `questiontable` where questionid = '"+req.params.questionid +"'", (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0])
  res.json(rows[0]);
});
connection.end();
console.log(result);
});
module.exports = router;
