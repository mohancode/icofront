var mongoose = require('mongoose');
var newschema = new mongoose.Schema({
    coinaddress: {type: String, required: true},
    cointype: {type: String, required: true}
});


module.exports = mongoose.model("Accounts", newschema);
