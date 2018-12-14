var mongoose = require('mongoose');
var User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/whitehouse',{ useNewUrlParser: true });

var userdet = [
  new User({
    name: 'sachin',
    imagePath: 'images/user-01.jpg',
    email: 'sachin@gmail.com',
    password:'mohan'
  }),
  new User({
    name: 'sachintendulkar',
    imagePath: 'images/user-01.jpg',
    email: 'sachin@gmail.com',
    password:'mohan'
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
