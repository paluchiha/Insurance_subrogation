var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var add;
var value;
var subprocess;
var subid;
function logout(){
  //alert("a");
  localStorage.removeItem("address");
  //alert("b");
  location.replace("index.html");
}


function createSub(){
  web3.personal.unlockAccount(add,"123456",7200);
  var foracc=parseInt($("#for").val());
  var typeofloss=$("#typeofloss").val();
  var dofloss=document.getElementById("dofloss").value;
  var polno=document.getElementById("polno").value;
  var polhold=document.getElementById("polhold").value;
  var resp=document.getElementById("resp").value;
  var vehicle1=document.getElementById("vehicle1").value;
  var ctype=$("#ctype").val();
  var tpvehicle=document.getElementById("tpvehicle").value;
  var tppol=document.getElementById("tppol").value;
  var amntr=document.getElementById("amntr").value;
  var polrno=document.getElementById("polrno").value;
  var remarks=document.getElementById("remarks").value;
  var accto=web3.eth.accounts[foracc];
  //alert(accto);
  subid=subprocess.createSubrogation(add,accto,typeofloss,dofloss,polno,polhold,resp,vehicle1,ctype,tpvehicle,tppol,amntr,polrno,remarks,"No Need",{from:add,gas:0x7A120});

  $("#running").show();
  $("#transferform").hide();
  $("#transferform1").hide();

  web3.eth.filter("latest").watch(function () {
      if (web3.eth.getTransaction(subid).blockNumber!==null) {
        //console.log("==mined thash");

        $("#running").hide();
        $("#transferform").show();
        $("#transferform1").show();
        //var thash=JSON.stringify(transhash);
       // console.log("mined thash");
        document.querySelector("#alertbox").innerHTML="<div class='alert alert-success'><strong>Success!</strong>Subrogation created successfully, and submitted</div>";
        $("#alertbox").show();
        //$("#transferform").reset();

        document.getElementById("transferform").reset();
        document.getElementById("transferform1").reset();
        $("#allowedwithdraw").hide();
      }

    });





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
