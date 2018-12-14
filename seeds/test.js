
var mongoose = require('mongoose');
var TokenTrans = require('../models/tokentrans');
var Tokendetails= require('../models/tokendetails');
var totalToken = 10000;
mongoose.connect('mongodb://localhost:27017/whitehouse',{ useNewUrlParser: true });
/*Tokendetails.findOne({sym: 'ATT'},function(err,result){
      console.log("result="+result);

});

Tokendetails.findOneAndUpdate({sym: 'ATT'},{$set:{totalsell: totalToken}},function(err,result){
      console.log("result="+result);

});*/



TokenTrans.aggregate([ {

        $group: {
            _id: null,
            total: {
              $sum: "$token"
            },
            count: { $sum: 1}
          }
        } ],function(err,result){
            console.log(result);
        });
