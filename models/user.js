var mongoose=require('mongoose');
mongoose.Promise = global.Promise
var Schema=mongoose.Schema;

var bcrypt = require('bcryptjs');

var userSchema=new Schema({
  uname:String,
  psw:String,
  fname:String,
  id:String,
  numb:{ type:Number , unique:true },
  add:String
});

var User=mongoose.model('User',userSchema);
module.exports=User;

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.psw, salt, function(err, hash) {
	        newUser.psw = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByPhoneNumber = function(numb, callback){
	var query = {numb: numb};
	User.findOne(query, callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
