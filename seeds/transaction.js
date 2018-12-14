var mongoose = require('mongoose');
var TokenTrans = require('../models/tokentrans');

mongoose.connect('mongodb://localhost:27017/whitehouse',{ useNewUrlParser: true });
var nwdt = new Date();
var userdet = [
  new TokenTrans({
    transactionid: 'sachin',
    to: 'images/user-01.jpg',
    token: 'images/user-01.jpg',
    amount: 'sachin@gmail.com',
    amttrnid:'mohan',
    date: nwdt
  })
];

var done = 0;
for( var i=0; i< userdet.length;i++){
  userdet[i].save(function(err,result){
    done++;
    if( done == userdet.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
