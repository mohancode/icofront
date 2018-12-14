var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next){
    res.render('user/profile');
});
router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn,function(req, res, next){
  next();
});

router.get('/signup',function(req,res,next){
  var messages = req.flash('error');
  var csrftoken = req.csrfToken();
  res.render('user/signup',{ csrfToken: csrftoken, messages: messages, hasErrors: messages.length > 0 });
});

router.post('/signup',passport.authenticate('local.signup',{
    successRedirect: '/token',
    failureRedirect: '/user/signup',
    failureFlash: true
}));


router.get('/signin',function(req, res, next){
  var messages = req.flash('error');
  var csrftoken = req.csrfToken();
  res.render('user/signin',{ csrfToken: csrftoken, messages: messages, hasErrors: messages.length > 0 });
});

router.post('/signin',passport.authenticate('local.signin',{
  successRedirect: '/token',
  failureRedirect: '/user/signin',
  failureFlash: true
}));



module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else{
      res.redirect('/');
    }
}

function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
      return next();
    }else{
      res.redirect('/');
    }
}
