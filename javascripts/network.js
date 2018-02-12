var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('127.0.0.1:8545'));
var rentcar_contractadd;
getContractAddress = function(callback) {

    web3.version.getNetwork(function(error, result) {
        if (error != null) {
            console.log('Unknown network');
            rentcar_contractadd = '';

            error = "Failed to load ethereum network and smart contract";
        } else if (result == "1" || result == "2" || result == "3") {
            if (result == "1") {
                rentcar_contractadd='';
                error("AuctionHouse is not deployed to the main net yet, please try the test net");
            }

            //Testnet Setup Morden
            if (result == "2") {
              alert("Morden Net");
            }

            // New testnet Ropsten
            if (result == "3") {
              //alert("saghd");
                rentcar_contractadd="0x002be063355a5f01a99c43290c3a06cc89b8bfc4";
                //alert(rentcar_contractadd);
            }
        }
        else {
            //For dev purposes - we use Fieldbook as a registry for our local contract address
          /*  var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://api.fieldbook.com/v1/5802f2556147990300c7827b/sheet_1?network=" + result + "&key=auctionhouse", false );
            xmlHttp.send( null );
            ah_contract_addr = JSON.parse(xmlHttp.responseText)[0]["value"];

            xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://api.fieldbook.com/v1/5802f2556147990300c7827b/sheet_1?network=" + result + "&key=samplename", false );
            xmlHttp.send( null );
            sn_contract_addr = JSON.parse(xmlHttp.responseText)[0]["value"];*/
            rentcar_contractadd="0x002be063355a5f01a99c43290c3a06cc89b8bfc4";
        }

        console.log("network id: " + result);
        console.log("auction house contract addr: " + rentcar_contractadd);
        //console.log("sample name contract addr: " + sn_contract_addr);

        callback("0x002be063355a5f01a99c43290c3a06cc89b8bfc4", error);

    });
};
