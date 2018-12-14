var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var Transaction = require('../models/transaction');
var TokenTrans = require('../models/tokentrans');
var Tokendetails = require('../models/tokendetails')
var web3 = new Web3('https://rinkeby.infura.io/v3/1daba21cfd7a4d9a8773600e943db915');
var Tx = require('ethereumjs-tx');

var account1 = '0xB7b9AFD2f454F43b3aE5185a2fd253aAf7545850';
var adminprivatekey='9C3CFA98FCCBDB29F2419C49E12CC8D60C08EB0CED9EDFB844906D599CE97ECC';
var sess;

router.get('/', function(req, res, next) {
  var balance =0;
  var totalSupply =0;
  var totalSold =0;
  var userbalance = 1;
  var userAddress;
  sess = req.session;
  totalSupply = sess.balanceadmin;
  var userbalance = sess.userbalance;
  console.log('Session balance admin'+ totalSupply);
  var balanceofAdmin = totalSupply;

  if(req.user.address){
    userAddress= req.user.address;
    req.app.locals.contract.methods.balanceOf(userAddress).call((err,result)=>{
        balance= result;
        totalSell = parseInt(balance) + parseInt(balanceofAdmin);
        req.app.locals.contract.methods.totalSupply().call((err,result)=>{

          var price = 0.0077;
          Tokendetails.find({sym: 'ATT'},function(err,result) {
                      totalSold = result[0].totalsell;
                      var price = result[0].price;
                      console.log("tokensold="+result[0].totalsell)
                        res.render('token/index',{transid:null, price: price,useraddress: userAddress, userBalance: userbalance,balance: balance,totalSupply: totalSupply, totalSold: totalSold});
                  });

          });
      });
  }else{
      res.render('token/index',{ transid:null,price: price,useraddress: 'nill', userBalance: '0',balance: '0',totalSupply: 0, totalSold: 0});
  }

});

router.post('/tokenbuy',function(req, res, next){


  var tokenBuy= req.body.number;
  var tokenamount = req.body.amount;
  var userprivatekey= req.body.privatekey;
  var userAddress;
  var totalToken=0;
  if(req.user.address){
    userAddress = req.user.address;

    // send ether to admin
    Tokendetails.find({sym: 'ATT'},function(err,result) { totalToken = result[0].totalsell; });

  web3.eth.getTransactionCount(userAddress,(err,txCount)=>{
   var contractaddress = '0x0CC5b17fB7a4CE0533de22A099758b06C453Db0f';
   // set the transaction
   const txObject = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(500000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('20','gwei')),
      to:account1,
      value:web3.utils.toHex(web3.utils.toWei(tokenamount,'ether'))
    }

    var userprivatekey1 = Buffer.from(userprivatekey,'hex');
    // sign the Transaction

    const tx = new Tx(txObject);
    tx.sign(userprivatekey1);
    const serializedTx = tx.serialize();
    const raw1 = '0x' + serializedTx.toString('hex');

    web3.eth.sendSignedTransaction(raw1, (err,txHash)=>{
      console.log(txHash);

      if(txHash){
        var currdatetime = new Date();
        var transDet =
          new Transaction({
            transactionid: txHash,
            from:userAddress  ,
            to : account1,
            amount:tokenamount ,
            currency:'ETH' ,
            date: currdatetime
          });
        transDet.save(function(err,result){
          console.log(result);
          console.log("saved");
        });
      const data = req.app.locals.contract.methods.transfer(userAddress,tokenBuy).encodeABI();
      web3.eth.getTransactionCount(account1, (err,txCount)=>{
        const txObject = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(500000),
          gasPrice: web3.utils.toHex(web3.utils.toWei('20','gwei')),
          to:req.app.locals.address,
          data: data
        }
        var userprivatekey1 = Buffer.from(adminprivatekey,'hex');
        // sign the Transaction
        const tx = new Tx(txObject);
        tx.sign(userprivatekey1);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        web3.eth.sendSignedTransaction(raw, (err,txHash2)=>{

          console.log('err:',err,'transaction:',txHash2);
          if(txHash2){
          var currdatetime = new Date();
          var tokentrans = new TokenTrans({
            transactionid : txHash2,
            to : userAddress ,
            token: tokenBuy,
            amount: tokenamount,
            amttrnid:txHash,
            date: currdatetime
          });
          tokentrans.save(function(err,result){
              console.log(result);

               var tToken = parseInt(totalToken) + parseInt(tokenBuy);

              Tokendetails.findOneAndUpdate({sym: 'ATT'},{$set:{totalsell: tToken}},function(err,result){
                    console.log("result="+result);
                    res.render('token/transummary',{transid:txHash, transtoken: txHash2});
              });


          });

        }
        });
      });

  }

});
});

}
});


router.get('/fundit',function(req, res, next){
  var balance =0;
  var totalSupply =0;
  var totalSold =0;
  var userbalance = 1;
  var userAddress;
  sess = req.session;
  totalSupply = sess.balanceadmin;
  var userbalance = sess.userbalance;
  console.log('Session balance admin'+ totalSupply);
  var balanceofAdmin = totalSupply;

  if(req.user.address){
    userAddress= req.user.address;
    contract.methods.balanceOf(userAddress).call((err,result)=>{
        balance= result;
        totalSell = parseInt(balance) + parseInt(balanceofAdmin);
        contract.methods.totalSupply().call((err,result)=>{
          totalSupply = result;
          totalSold =   balance;
          res.render('token/trans',{ price: price,useraddress: userAddress, userBalance: userbalance,balance: balance,totalSupply: totalSupply, totalSold: totalSold});

        });

    });
  }else{
      res.render('token/trans',{ price: price,useraddress: 'nill', userBalance: '0',balance: '0',totalSupply: 0, totalSold: 0});
  }

});

router.post('/fundit',function(req, res, next){

  var toAddress= req.body.toaddress;
  var tokento= req.body.tonumber;
  if(req.user.address){
    userAddress = req.user.address;
    console.log(userAddress);
    const data = contract.methods.transferFrom(userAddress,toAddress,tokento).encodeABI();
    web3.eth.getTransactionCount(account1, (err,txCount)=>{

      const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(500000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('20','gwei')),
        to:address,
        data: data
      }
      const tx = new Tx(txObject);
      tx.sign(privatekey1);

      const serializedTx = tx.serialize();
      const raw = '0x' + serializedTx.toString('hex');

      web3.eth.sendSignedTransaction(raw, (err,txHash)=>{
        console.log('err:',err,'transaction:',txHash);

        res.redirect('/');
      });
    });
  }
});

module.exports = router;
