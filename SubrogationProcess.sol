pragma solidity ^0.4.4;

contract SubrogationProcess{

    //The following structure is an Insurance Body
    struct InsuranceBody{
        //address ownaddress;
        uint256 balance;                      //This is to define token, now let's assume it as same
        string insname;                       //as INR.
        uint256 login_id;                      // This login_id and passphrase will be used as a
        string passphrase;                  //simplified login credentials for two insurance company

    }


    //The following structure is for creating an allowance ledger

    struct Allowance{
        address owner;     //to
        address spender;    //from
        uint256 allowance_amount;
    }


    //enum ClaimType {Total, Normal}
    //enum SubrogationStatus {Pending, Approved, Rejected}
    //The following structure is for creating a subrogation
   /* struct Subrogationpart{

        uint256 thirdparty_policynumber;
        uint256 amountto_recover;
        string dateoftimebar;
        uint256 police_report_no;
        string salvage_retained_by;
        uint256 highestbid;
        uint256 second_highestbid;
        uint256 third_highestbid;
        uint256 salvage_bid_third_Insurer;
        uint256 salvageamnt_collected;
        string remarks;
        string status;
    }*/
    struct Subrogation{
        address from_Insurancecomp;
        address for_Insurancecomp;
       // uint256 maxvalue;
        string typeofloss;
        string dateofloss;
        uint256 policynumber;
        string policyholder;
        uint256 resp_percentage;
        string vehicle_details;
        string ctype;

        //string indvidual_name;
        string thirdparty_vehicle_details;
        uint256 thirdparty_policynumber;
        uint256 amountto_recover;
        //string dateoftimebar;
        uint256 police_report_no;
        string remarks;
        string status;

       // Subrogationpart sub;
    }


    Subrogation[] subrogations;
    //This section contains mapping
    mapping(address=>InsuranceBody) public insbody;
    mapping(address=>uint[]) public sentSubrogations;

    mapping(address=>Allowance) public allowance;



    //The Following constructor will create two insurance body.
    function SubrogationProcess(){
        address ins1=0xdf9043c49869ef09a1b9d5d690c350ad3ff1caaa;
        address ins2=0x2513d2214ac075f22f061e80bb4af7f166dcccda;


        //This initializes first insurer LICI
        insbody[ins1].balance=90000;
        insbody[ins1].login_id=123456;
        insbody[ins1].passphrase="ins123";
        insbody[ins1].insname="LICI";

        //this inilitiazes second insurer SBI
        insbody[ins2].balance=50000;
        insbody[ins2].login_id=654321;
        insbody[ins2].passphrase="ins654";
        insbody[ins2].insname="SBI";

        allowance[ins1].owner=ins1;
        allowance[ins1].spender=ins2;
        allowance[ins1].allowance_amount=0;

        allowance[ins2].owner=ins2;
        allowance[ins2].spender=ins1;
        allowance[ins2].allowance_amount=0;



    }


    function getAllowance(address _owner,address _spender) constant returns(uint){
        Allowance a=allowance[_owner];
        if(a.spender==_spender){
            return a.allowance_amount;
        }
        return 0;

    }

    //following function returns the values of a insurance company
    function getInsuranceBody(address ad) returns(uint256,string,uint256,string){
        InsuranceBody ib=insbody[ad];
        return(
            ib.balance,
            ib.insname,
            ib.login_id,
            ib.passphrase
            );

    }





    //login credential check
    //following function is to find a company by it's login_id
    function findByLogin(uint256 _loginid) returns (bool,string,string){
         InsuranceBody ib1=insbody[0xdf9043c49869ef09a1b9d5d690c350ad3ff1caaa];
         InsuranceBody ib2=insbody[0x2513d2214ac075f22f061e80bb4af7f166dcccda];
         if(_loginid==ib1.login_id){
             return(true,ib1.passphrase,"0xdf9043c49869ef09a1b9d5d690c350ad3ff1caaa");
         }
         else if(_loginid==ib2.login_id){
             return(true,ib2.passphrase,"0x2513d2214ac075f22f061e80bb4af7f166dcccda");
         }
         else{
             return(false,"","0x0");
         }
    }


    //following function is written to transfer fund from one account to another
    function transfer(address _from,address _to,uint256 _value) returns (bool success){
        InsuranceBody from=insbody[_from];
        InsuranceBody to=insbody[_to];
        if(from.balance<_value){
            success=false;
        }
        else{
            from.balance=from.balance-_value;
            to.balance=to.balance+_value;
            success=true;
        }
        return success;
    }
    //following function is used to withdraw money from second party of subrogation upto
    // a permissioned allowance amount

    function transferFrom(address _from,address _to,uint256 _value) returns (bool){
        InsuranceBody from=insbody[_from];
        InsuranceBody to=insbody[_to];
        Allowance a=allowance[_to];
        if(a.allowance_amount>=_value){
            if(from.balance>=_value){
                a.allowance_amount=a.allowance_amount-_value;
                from.balance=from.balance-_value;
                to.balance=to.balance+_value;
                return true;
            }
        }
        return false;


    }
    //The Following function will create a subrogation
   // uint len=0;
    function createSubrogation (address _from,
                                address _for,
                                string _typeofloss,
                                string _dateofloss,
                                uint256 _policynumber,
                                string _policyholder,
                                uint256 _resp_percentage,
                                string _vehicle_details,
                                string _ctype,


                                string _thirdparty_vehicle_details,
                                uint256 _thirdparty_policynumber,
                                uint256 _amountto_recover,

                                uint256 _police_report_no,
                                string _remarks,
                                string _status
                                )returns (uint subro_id){
        subro_id=subrogations.length++;
        //Subrogation s=subrogations[len];
        subrogations[subro_id].from_Insurancecomp=_from;
        subrogations[subro_id].for_Insurancecomp=_for;
        //subrogations[len].maxvalue=_maxvalue;
        subrogations[subro_id].typeofloss=_typeofloss;
        subrogations[subro_id].dateofloss=_dateofloss;
        subrogations[subro_id].policynumber=_policynumber;
        subrogations[subro_id].policyholder=_policyholder;
        subrogations[subro_id].resp_percentage=_resp_percentage;
        subrogations[subro_id].vehicle_details=_vehicle_details;
        subrogations[subro_id].ctype=_ctype;
        //subrogations[len].insname=_insname;
        //subrogations[len].indvidual_name=_indvidual_name;
        subrogations[subro_id].thirdparty_vehicle_details=_thirdparty_vehicle_details;
        subrogations[subro_id].thirdparty_policynumber=_thirdparty_policynumber;
        subrogations[subro_id].amountto_recover=_amountto_recover;
        //s.sub.dateoftimebar=_dateoftimebar;
        subrogations[subro_id].police_report_no=_police_report_no;

        subrogations[subro_id].remarks=_remarks;
        subrogations[subro_id].status="Pending";

        sentSubrogations[subrogations[subro_id].from_Insurancecomp].push(subro_id);
        return subro_id;
    }

     function getSubrogationCount() returns (uint) {
        return subrogations.length;
    }

    

      function findSubrogationpart(uint subro_id) returns (address _from,address _for,
                                                    string _typeofloss,string _dateofloss,
                                                    uint256 _policyno,string _policyholder,
                                                    uint256 _resp_perc,string _vehicledetails,
                                                    string _ctype){
        _from=subrogations[subro_id].from_Insurancecomp;
        _for=subrogations[subro_id].for_Insurancecomp;
        _typeofloss=subrogations[subro_id].typeofloss;
        _dateofloss=subrogations[subro_id].dateofloss;
        _policyno=subrogations[subro_id].policynumber;
        _policyholder=subrogations[subro_id].policyholder;
        _resp_perc=subrogations[subro_id].resp_percentage;
        _vehicledetails=subrogations[subro_id].vehicle_details;
        _ctype=subrogations[subro_id].ctype;

        return(_from,_for,_typeofloss,_dateofloss,_policyno,_policyholder,_resp_perc,_vehicledetails,_ctype);
      }
      function findsubrogationfull(uint subro_id) returns (
                                string _thirdparty_vehicle_details,
                                uint256 _thirdparty_policynumber,
                                uint256 _amountto_recover,

                                uint256 _police_report_no,
                                string _remarks,
                                string _status){
                    _thirdparty_vehicle_details=subrogations[subro_id].thirdparty_vehicle_details;
                    _thirdparty_policynumber=subrogations[subro_id].thirdparty_policynumber;
                    _amountto_recover=subrogations[subro_id].amountto_recover;
                    _police_report_no=subrogations[subro_id].police_report_no;
                    _remarks=subrogations[subro_id].remarks;
                    _status=subrogations[subro_id].status;
                    return(_thirdparty_vehicle_details,_thirdparty_policynumber,_amountto_recover,_police_report_no,_remarks,_status);
        }

          function acceptSubrogation(uint subro_id) returns (bool){
           
            Subrogation s=subrogations[subro_id];
            bool x=approveAllowance(s.for_Insurancecomp,s.from_Insurancecomp,s.amountto_recover);
            if(x){
                s.status="Approved";
                return true;
            }
            return false;
    }
    function rejectSubrogation(uint subro_id) {
        Subrogation s=subrogations[subro_id];
        s.status="Rejected";

    }

    function approveAllowance(address _spender,address _owner,uint _value) returns (bool success){
        Allowance a=allowance[_owner];
        if(a.spender==_spender){
            InsuranceBody inb=insbody[_spender];
            if(inb.balance>=_value){
                a.allowance_amount=a.allowance_amount+_value;
                return true;
            }
        }
        return false;
    }


}

