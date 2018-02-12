var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var add;
var value;
var subprocess;

function logout(){
  //alert("a");
  localStorage.removeItem("address");
  //alert("b");
  location.replace("index.html");
}



function insertARows(sel)
{
  var html;


  var x=getallpendingSub();
  //console.log("length "+x.length)
  if(x.length>0)
  {
    for(var c=0;c<x.length;c++){
      //console.log(x[c][4]);
    if(sel=="-1"){
        var m=x[c];
        html="<tr class='gradeX'>";
        for(var i=0;i<m.length;i++){

          html+="<td>"+x[c][i]+"</td>";

        }
        html+="<td class='center'><button class='btn btn-primary' id='modalview"+c+"' onclick='modalsub("+c+")'>View</button></td>";
        document.querySelector("#actionslist").innerHTML+=html;
        html="";

    }

     else if(x[c][4]==sel){
        var m=x[c];
        html="<tr class='gradeX'>";
        for(var i=0;i<m.length;i++){

          html+="<td>"+x[c][i]+"</td>";

        }
        html+="<td class='center'><button class='btn btn-primary' id='modalview"+c+"' onclick='modalsub("+c+")'>View</button></td>";
        document.querySelector("#actionslist").innerHTML+=html;
        html="";

      }

     /* else if(x[c][4]==sel){
        var m=x[c];
        html+="<tr class='gradeX'>";
        for(var i=0;i<m.length;i++){

          html+="<td>"+x[c][i]+"</td>";

        }
        html+="<td class='center'><button class='btn btn-primary' id='modalview"+c+"' onclick='modalsub("+c+")'>View</button></td>";
        document.querySelector("#actionslist").innerHTML+=html;
        html="";
      }
      else if(x[c][4]==sel){
        var m=x[c];
        html+="<tr class='gradeX'>";
        for(var i=0;i<m.length;i++){

          html+="<td>"+x[c][i]+"</td>";

        }
        html+="<td class='center'><button class='btn btn-primary' id='modalview"+c+"' onclick='modalsub("+c+")'>View</button></td>";
        document.querySelector("#actionslist").innerHTML+=html;
        html="";
      }*/

      /*  alert("every time else");


    */
  }
  }

};


function getallpendingSub(){
  var xp=[];
  var sp=[];
  var acto=web3.eth.accounts[0];
  var c;

  val=subprocess.getSubrogationCount.call({from:add});
  var maxlen=val.c[0];
//  alert("maxlen "+maxlen);
  for( c=0;c<maxlen;c++){
    var p=parseInt(c);
    part1=subprocess.findSubrogationpart.call(p,{from:add});
    //alert("before if");
    full=subprocess.findsubrogationfull.call(p,{from:add});


      xp[0]=subprocess.getInsuranceBody.call(part1[0])[1];
      xp[1]=subprocess.getInsuranceBody.call(part1[1])[1];
      xp[2]=part1[5];
      xp[3]=full[2].c[0];
      xp[4]=full[5];


    //console.log(xp);
   sp[c] = new Array(20);
    sp[c]=xp;
    //console.log(sp[c]);
    xp = [];
  }
  //console.log(sp);
  return(sp);
}

function removerows(){
  var tbod=document.getElementById("actionslist");
  var sel=$("#sortstatus").val();
  document.querySelector("#actionslist").innerHTML="";
  insertARows(sel);
}


function modalsub(val){
  //alert(val);

  $('#myModal').modal('show');


  var subid=parseInt(val);
  part1=subprocess.findSubrogationpart.call(subid,{from:add});
  full=subprocess.findsubrogationfull.call(subid,{from:add});
  var html=" <table class='table table-bordered data-table'> <tr> <td>From</td> <td>"+part1[0]+"</td> </tr> <tr> <td>To</td> <td>"+part1[1]+"</td> </tr> <tr> <td>Type of Loss</td> <td>"+part1[2]+"</td> </tr> <tr> <td>Date of Loss</td> <td>"+part1[3]+"</td> </tr> <tr> <td>Policy Number</td> <td>"+part1[4].c[0]+"</td> </tr> <tr> <td>Policy Holder</td> <td>"+part1[5]+"</td> </tr> <tr> <td>Responsibility Percentage</td> <td>"+part1[6].c[0]+"</td> </tr> <tr> <td>Vehicle Details</td> <td>"+part1[7]+"</td> </tr> <tr> <td>Claim Type</td> <td>"+part1[8]+"</td> </tr> <tr> <td>Third Party Vehicle Details</td> <td>"+full[0]+"</td> </tr> <tr> <td>Third Party Policy Number</td> <td>"+full[1].c[0]+"</td> </tr> <tr> <td>Amount to Recover</td> <td>"+full[2].c[0]+"</td> </tr> <tr> <td>Police Report No</td> <td>"+full[3].c[0]+"</td> </tr> <tr> <td>Remarks</td> <td>"+full[4]+"</td> </tr> <tr> <td>Status</td> <td>"+full[5]+"</td> </tr> </table> ";
  document.querySelector("#modalbody").innerHTML=html;
  var foot="<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"
  document.querySelector("#modalfooter").innerHTML=foot;
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
  insertARows(-1);

};
