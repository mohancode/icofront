var mongoose = require('mongoose');


var newschema = new mongoose.Schema({
    transactionid: {type: String, required: true},
    to : {type: String, required: true},
    token: {type: Number, required: true},
    amount: {type: String, required: true},
    amttrnid: { type: String, required: true},
    date: {type: String, required: true}

});


module.exports = mongoose.model("TokenTrans", newschema);
