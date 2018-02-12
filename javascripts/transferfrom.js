var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var add;
var value;
var subprocess;

function transferfromfun(){
  web3.personal.unlockAccount(add,"123456",7200);
  var a=parseInt($("#accountto").val());
  var b=parseInt(document.getElementById("amount").value);
  //alert(add+"   "+web3.eth.accounts[a]);
//  subprocess.transferFrom(web3.eth.accounts[a],add,b,{from:add,gas:0xEA60});
   $("#running").show();
  $("#transferform").hide();


  if(subprocess.transferFrom.call(web3.eth.accounts[a],add,b,{from:add,gas:0xEA60})){
    var trhash=subprocess.transferFrom(web3.eth.accounts[a],add,b,{from:add,gas:0xEA60});
    web3.eth.filter("latest").watch(function () {
      if (web3.eth.getTransaction(trhash).blockNumber!==null) {
        //console.log("==mined thash");

        $("#running").hide();
        $("#transferform").show();
        //var thash=JSON.stringify(transhash);
       // console.log("mined thash");
        document.querySelector("#alertbox").innerHTML="<div class='alert alert-success'><strong>Success!</strong> Transaction mined Successfully, transfer successful</div>";
        $("#alertbox").show();
        //$("#transferform").reset();
        updatebalance();
        document.getElementById("transferform").reset();
        $("#allowedwithdraw").hide();
      }

    });
  }
  else {
    $("#running").hide();
    $("#transferform").show();
    document.querySelector("#alertbox").innerHTML="<div class='alert alert-danger'><strong>Error!</strong>You Don't Have enough Balance to transfer</div>";
  }
 $("#alertbox").show();
}

function getallowance(){
  var a=parseInt($("#accountto").val());
  var amou=subprocess.getAllowance(add,web3.eth.accounts[a],{from:add});
  document.getElementById("amountwith").innerHTML=amou+"";
  $("#allowedwithdraw").show();
}


function updatebalance(){
  subprocess=getContract();
  value=subprocess.getInsuranceBody.call(add);
  document.getElementById("balance").innerHTML="Balance "+value[0].c[0];
}
function logout(){
  //alert("a");
  localStorage.removeItem("address");
  //alert("b");
  location.replace("index.html");
}


window.onload=function(){
  //alert("onload start");
  if(localStorage.getItem("address")==null){
    localStorage.clear();
    location.replace("index.html");
  }
  else{
    add=localStorage.getItem("address");
  }
  subprocess=getContract();
  value=subprocess.getInsuranceBody.call(add);
  document.getElementById("balance").innerHTML="Balance "+value[0].c[0];
  document.getElementById("username").innerHTML="Welcome "+value[1];
  $("#allowedwithdraw").hide();
   $("#running").hide();
  $("#transferform").show();
  $("#transferform1").show();
  $("#alertbox").hide();

};
