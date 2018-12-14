var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    imagepath : {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: true}
});

schema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

schema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model("User", schema);
