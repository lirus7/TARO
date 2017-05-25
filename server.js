var express=require('express');
var app=express();
var mongoose=require('mongoose');
var assert = require('assert');
var bodyParser = require('body-parser');
var path = require('path');

mongoose.connect('mongodb://localhost/tarodb');
var db=mongoose.connection;

var User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'views/login.html'));
});

app.post('/',function(req,res){
  console.log(req.body.numb,req.body.psw);
  User.getUserByPhoneNumber(req.body.numb, function(err, user)
  {
    if(err) throw err;
    if(!user)
      console.log("Not a valid ID");

    User.comparePassword(req.body.psw, user.psw, function(err, isMatch){
      if(err) throw err;
      if(isMatch)
        res.sendFile(path.join(__dirname,'views/profile.html'));
      else
      {
        console.log('Incorrect Password');
        res.sendFile(path.join(__dirname,'views/login.html'))
      }
   });
 });
});

app.post('/thankyou',function(req,res){
  //add this to the db
    console.log(req.body.uname,req.body.numb);
    var newUser = User({
      uname:req.body.uname,
      psw:req.body.psw,
      fname:req.body.fname,
      id:req.body.id,
      numb:req.body.numb,
      add:req.body.add
    });

// save the user
    User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});
  res.sendFile(path.join(__dirname,'views/thankyou.html'));
});


app.get ('/thankyou',function(req,res){
  res.sendFile(path.join(__dirname,'views/thankyou.html'));
});

app.get('/signup',function(Req,res){
  res.sendFile(path.join(__dirname,'views/signup.html'));
});

var server=app.listen(8888,function(){
  console.log('listening on port 8888' );
});
