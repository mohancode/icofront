var Web3 = require('web3');
var web3 = new Web3("https://rinkeby.infura.io/v3/1daba21cfd7a4d9a8773600e943db915");
var Tx = require('ethereumjs-tx');


var account1 = '0xB7b9AFD2f454F43b3aE5185a2fd253aAf7545850';
var account2 = '0x58204833db2d563689001A0C7b30EEb555D8d339';

//export PRIVATE_KEY_1='9C3CFA98FCCBDB29F2419C49E12CC8D60C08EB0CED9EDFB844906D599CE97ECC'
var privatekey1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex');
//export PRIVATE_KEY_2='2ECD014000E705A00E6C4D85AEF3D6843B62369475C6CF1AAA3D7B79B27C122D'
var privatekey2 = Buffer.from(process.env.PRIVATE_KEY_2,'hex');

var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];


var address = '0x0CC5b17fB7a4CE0533de22A099758b06C453Db0f';
var contract = new web3.eth.Contract(abi, address);

const data = contract.methods.transfer(account2,1000).encodeABI();

const contractAddress = '';
console.log(data);
exports
contract.methods.balanceOf(account1).call((err,result)=>{
  console.log(result);
});

contract.methods.balanceOf(account2).call((err,result)=>{
  console.log(result);
});
