var express = require('express');
var router = express.Router();
var Account  = require('../models/accounts');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var DepositeDet = require('../models/deposite')
var web3 = new Web3('https://rinkeby.infura.io/v3/1daba21cfd7a4d9a8773600e943db915');
var depoDet;
router.get('/', function(req, res, next) {

});
router.get('/deposite', function(req, res, next) {

      var userAddress= 'Useraddress';
      var coinAddress = 'coinAddress';
      var sess = req.session;
      userAddress= req.user.address;
      console.log(req.user);
      DepositeDet.find({},function(err,result){
        console.log(result);
        depoDet = result;
      });
      Account.find({cointype:'eth'},function(err,result){

        coinAddress = result[0].coinaddress;

        web3.eth.getBalance(userAddress,(err,result)=>{

        userbalance = web3.utils.fromWei(result,'ether');
        if(userbalance) {
        res.render('action/deposite',{depoDetails: depoDet,userAddress: userAddress,userbalance: userbalance, coinAddress, coinAddress,txHash: 0});
      } });
      });

});
router.post('/deposite', function(req, res, next) {
    DepositeDet.find({},function(err,result){
      depoDet = result;
    });
    console.log(req.body);
    var userAddress= req.body.userAddress;
    var coinAddress = req.body.coinAddress;
    var Amount= req.body.amount;
    var PrivateKey = req.body.privatekey;
    var sess = req.session;
    Account.find({cointype:'eth'},function(err,result){

      coinAddress = result[0].coinaddress;
      userAddress= req.user.address;
      web3.eth.getBalance(userAddress,(err,result)=>{
      userbalance = web3.utils.fromWei(result,'ether');
      if(userbalance > Amount)  {
      web3.eth.getTransactionCount(userAddress,(err,txCount)=>{

       const txObject = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(500000),
          gasPrice: web3.utils.toHex(web3.utils.toWei('20','gwei')),
          to:coinAddress,
          value:web3.utils.toHex(web3.utils.toWei(Amount,'ether'))
        }
        var userprivatekey1 = Buffer.from(PrivateKey,'hex');
        const tx = new Tx(txObject);
        tx.sign(userprivatekey1);
        const serializedTx = tx.serialize();
        const raw1 = '0x' + serializedTx.toString('hex');

        web3.eth.sendSignedTransaction(raw1, (err,txHash)=>{
          console.log(txHash);
          if(txHash){
            var currdatetime = new Date();
            var deposite =
              new DepositeDet({
                transactionid: txHash,
                from:userAddress  ,
                to : coinAddress,
                amount:Amount ,
                currency:'ETH' ,
                date: currdatetime
              });
            deposite.save(function(err,result){
              console.log(result);
              console.log("saved");
            });
          }
          res.render('action/deposite',{i: 0, depoDetails: depoDet,userAddress: userAddress,userbalance: userbalance, coinAddress, coinAddress,txHash: txHash});
          });
      }); }
    });
  });
});

module.exports = router;
