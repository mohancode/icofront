var mongoose = require('mongoose');


var newschema = new mongoose.Schema({
    transactionid: {type: String, required: true},
    from: {type: String, required: true},
    to : {type: String, required: true},
    amount: {type: String, required: true},
    currency: {type: String, required: true},
    date: {type: String, required: true}
});


module.exports = mongoose.model("Transaction", newschema);
