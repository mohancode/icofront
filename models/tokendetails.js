var mongoose = require('mongoose');


var newschema = new mongoose.Schema({
    totalsell: {type: Number, required: true},
    sym: {type: String, required: true},
    price : {type: Number, required: true}

});


module.exports = mongoose.model("Tokendetails", newschema);
