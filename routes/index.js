var express = require('express');
var router = express.Router();
var Account  = require('../models/accounts');

var adminAddress;
var sess;


/* GET home page. */
router.get('/', function(req, res, next) {

  Account.find({cointype:'eth'},function(err,result){
  adminAddress = result[0].coinaddress;
  var sess = req.session;
   req.app.locals.contract.methods.balanceOf(adminAddress).call((err,result)=>{
    sess.balanceadmin = result;
    sess.adminacc = adminAddress;
    res.render('icohome/index', { title: 'Express' });
  });
  });

});

module.exports = router;
