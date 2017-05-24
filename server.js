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
