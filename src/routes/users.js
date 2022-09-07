const mysql = require('mysql2')
var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/:userid/course/:courseid',function(req,res)
{
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
  var userid = req.params.userid;
  var courseid = req.params.courseid;
  console.log(userid,courseid)
  var addnewcourse=null;
  var courseids = null;
  connection.query("select `listofcourseid` from `usertable` where usertable.userid = '"+req.params.userid+"'", (err,rows,fields)=>
  {
    if(err)throw err
    console.log('Selected :',rows[0]["listofcourseid"])
    courseids=rows[0]["listofcourseid"];
  if(courseids==null){
     addnewcourse= courseid;
  }
  else{
     addnewcourse = courseids+","+courseid;
  }
  console.log(addnewcourse);
  connection.query("Update `usertable` set `listofcourseid`= \""+addnewcourse+"\" where userid =\""+userid+"\"",(err,rows,fields)=>
  {
    if(err){
      throw err;
      res.json({"result":"Failed"})
    }
    else
    {
      res.json({"result":"Success"})
    }
  });
});
});
 // connection.end();




 

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

router.get('/:userid', function(req, res, next) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
  var result ;
  connection.connect()
  connection.query("select * from `usertable` where userid = '"+req.params.userid +"'", (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0])
  res.json(rows[0]);
});
connection.end();
console.log(result);
 
});

module.exports = router;

/*
 

 app.get('/signup', function(req, res){
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
  res.render('signup');
});
app.post('/signup', function(req, res){
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
  if(!req.body.id || !req.body.password){
     res.status("400");
     res.send("Invalid details!");
  } else {
     Users.filter(function(user){
        if(user.id === req.body.id){
           res.render('signup', {
              message: "User Already Exists! Login or choose another user id"});
        }
     });
     var newUser = {id: req.body.id, password: req.body.password};
     Users.push(newUser);
     req.session.user = newUser;
     res.redirect('/protected_page');
  }
});
function checkSignIn(req, res){
  if(req.session.user){
     next();     //If session exists, proceed to page
  } else {
     var err = new Error("Not logged in!");
     console.log(req.session.user);
     next(err);  //Error, trying to access unauthorized page!
  }
}
app.get('/protected_page', checkSignIn, function(req, res){
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
  res.render('protected_page', {id: req.session.user.id})
});

app.get('/login', function(req, res){
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
  res.render('login');
});

app.post('/login', function(req, res){
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
  console.log(Users);
  if(!req.body.id || !req.body.password){
     res.render('login', {message: "Please enter both id and password"});
  } else {
     Users.filter(function(user){
        if(user.id === req.body.id && user.password === req.body.password){
           req.session.user = user;
           res.redirect('/protected_page');
        }
      });
      res.render('login', {message: "Invalid credentials!"});
   }
});

app.get('/logout', function(req, res){
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
});

app.use('/protected_page', function(err, req, res, next){
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/login');
});

router.post('/create', function (req, res) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
  var userid= Date.now();
  var username=req.body.username;
  var password=req.body.password;
  var userids=null;
  var addnewuser=null;
  var authToken=null;
  var listofcourseid=null;
  //console.log(userid)
  connection.query("select `username` from `usertable` where usertable.username = '"+username+"'", (err,rows,fields)=>
  {
    if(err)throw err
    //console.log(rows)
    console.log('Selected :',rows[0]["username"])
    usernames=rows[0]["username"];
  if(usernames==null){
     createaccount= username;
  }
  else{
    createaccount = usernames+","+username;
  }
  console.log(addnewuser);
  connection.query("Insert into `usertable`(`userid`,`username`,`typeofuser`,`password`,`authToken`,`listofcourseid`) values "+"("+"\""+userid+"\","
  +"\""+username+ "\","+"\""+typeofuser+"\","+"\""+password+"\","+"\""+authToken+"\","+"\""+listofcourseid+"\")",(err,rows,fields)=>
  {
    if(err){
      throw err;
      res.json({"result":"Failed"})
    }
    else
    {
      res.json({"result":"Success"})
    }
   });
   });
  });



app.post('/login', function (req, res) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helan@23',
    database: 'nodelogin'
  })
  try{
      let User = users.find((data) => req.body.email === data.email);
      if (User) {
  
          let submittedPass = req.body.password; 
          let storedPass = User.password; 
  
          const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
          if (passwordMatch) {
              let usrname = User.username;
              res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
          } else {
              res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
          }
      }
      else {
          let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
          await bcrypt.compare(req.body.password, fakePass);
          res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
      }
  } catch{
      res.send("Internal server error");
  }
});
*/


