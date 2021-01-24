import React from 'react';
function three(num) {
    if (num < 10) {
        return "00" + num;
    }
    else if (num < 100) {
        return "0" + num;
    }
    else return num;
}
function putcommas(num) {
    var res = "";
    if(num===0){
        return 0;
    }
    while (num > 0) {
        if(num>=1000){
            res = "," + three(num%1000) + res;
        }
        else{
            res = num%1000 + res;
        }
        num=parseInt(num/1000);
    }
    return res;
}
const CurInv = ({ money }) => {
    if (money != null) {
        return (
            <div>
                {putcommas(money)}원
            </div>
        );
    }
    else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}

export default CurInv;