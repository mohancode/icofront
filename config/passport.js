var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var Web3 = require('web3');
var web3 = new Web3("https://rinkeby.infura.io/v3/1daba21cfd7a4d9a8773600e943db915");

passport.serializeUser(function(user, done){
  done(null,user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, result){
      done(err, result);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  imagepath = '/images/default.png';
  name = req.body.name;
  var account = web3.eth.accounts.create();
  console.log(account);
  var address = account.address;
  var privateKey = account.privateKey;
  req.checkBody('email','Invalid Eamil').notEmpty().isEmail();
  req.checkBody('password','Invalid Password').notEmpty().isLength({min: 8});
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(function(error){
        messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }

  User.findOne({'email': email},function(err,user){
      if(err) {
        return done(err);
      }
      if(user){
        return done(null, false, { message: 'Email was already Exit'});
      }
      var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.imagepath = imagepath;
      newUser.name = name;
      newUser.address = address;

      newUser.save(function(err, result){
        if(err) {
          return done(err);
        }
        return done(null, newUser);
      });
  });
}));

passport.use('local.signin',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},function(req, email, password, done){
  var sess = req.session;
  req.checkBody('email','Invalid Eamil').notEmpty().isEmail();
  req.checkBody('password','Invalid Password').notEmpty().isLength({min: 8});
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(function(error){
        messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  console.log('email:',email);

  User.findOne({'email': email},function(err,user){
      console.log(user);
      console.log(err);
      console.log('--------------------------------------');
      var userAddress = user.address;
      if(err) {
        return done(err);
      }
      if(!user){
        return done(null, false, { message: 'User not Found'});
      }
      if(!user.validPassword(password)){
        return done(null, false, { message: 'Wrong Password'});
      }
      web3.eth.getBalance(userAddress,(err,res)=>{
      userbalance = web3.utils.fromWei(res,'ether');

      sess.userbalance = userbalance;
      sess.user = user;
      console.log(user)
      return done(null, user);
    });

  });
}));
