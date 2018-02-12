var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var add;
var value;
var subprocess;

function transfer(){
  web3.personal.unlockAccount(add,"123456",7200);
  var a=parseInt($("#accountto").val());
  var b=parseInt(document.getElementById("amount").value);
  //alert(add);

  $("#running").show();
  $("#transferform").hide();

  if(subprocess.transfer.call(add,web3.eth.accounts[a],b,{from:web3.eth.accounts[0]})){
    var trhash=subprocess.transfer(add,web3.eth.accounts[a],b,{from:web3.eth.accounts[0]});
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
      }

    });
  }
  else {
    document.querySelector("#alertbox").innerHTML="<div class='alert alert-danger'><strong>Error!</strong>You Don't Have enough Balance to transfer</div>";
  }
  $("#alertbox").show();
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
  //alert(add);
  subprocess=getContract();
  value=subprocess.getInsuranceBody.call(add);
  document.getElementById("balance").innerHTML="Balance "+value[0].c[0];
  document.getElementById("username").innerHTML="Welcome "+value[1];
  $("#running").hide();
  $("#transferform").show();
  $("#alertbox").hide();

};
