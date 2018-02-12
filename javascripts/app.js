var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var subprocess;
function login(){
  var loginid=document.getElementById("log_in").value;
	var pwd=document.getElementById("password").value;
  //alert(loginid+"   "+pwd);
  var value=subprocess.findByLogin.call(loginid);
    if(value[0]){
      if(value[1]==pwd){
        localStorage.setItem("address",value[2]);
    		location.replace("dashboard.html");
      }
      else{
        alert("Invalid credentials!!!!");
      }
    }
    else{
      alert("Invalid Credentials!!!!");
    }
}

window.onload=function(){
  if(localStorage.getItem("address") !== null)
  {
    location.replace("dashboard.html");
  }
  subprocess=getContract();
}
