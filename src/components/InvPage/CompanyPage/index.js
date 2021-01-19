import React, {useEffect, useState} from 'react';
import Company from './Company';
import AfterInv from './AfterInv';
import CurInv from './CurInv';
import Input from './Input';
import './index.css';
import { defaultProps } from 'recompose';
import { withFirebase } from '../../Firebase';
import { get } from 'http';
import { type } from 'os';
import { parse } from 'path';
export var sum = 0;
const CompanyPage = ({curm, name, invDone, index, calc, firebase, aftm}) => {
    //var aftm = 0;
    // curm = aftm;
    const [inputm, setInputm] = useState("0");
    const [radioNum, setRadioNum] = useState(-1);
    const handleChange = (event) => {
        const {target: {value}} = event;
        console.log("val",value);
        console.log("parse",parseInt(value));
        if(radioNum!==0&&radioNum!==1){
            alert("please check!");
            setInputm("0");
        }
        else if(!isNaN(parseInt(value))){
            console.log("value",value);
            // var parsed = value.replace(/[.]$/,'');
            // console.log("parsed",parsed);
            var parsed = value;
            parsed = parsed.replace(/^0+(?=\d)/, '').replace(/[^0-9]/,'');
            
            console.log("hhkhj");
            if(radioNum===1){
                
                if(parseInt(parsed)>curm){
                    alert("hey!");
                    setInputm(prev=>prev);
                }
                else{
                    setInputm(parsed);
                }
            }
            else{
                setInputm(parsed);
            }
        }
        else{
            console.log("asdfasfasfasf");
            setInputm("0");
        }
    }
    useEffect(()=>{
        calc(parseInt(inputm), index, radioNum);
    })
    switch (radioNum){
        case 0:
            aftm = parseInt(curm) + (inputm ? parseInt(inputm) :  0);
            break;
        case 1:
            aftm = parseInt(curm) - (inputm ? parseInt(inputm) :  0);
            break;
        default:
            aftm = parseInt(curm);
            break;
    }
    if (invDone) {
         const fb =  firebase;
         const user = fb.auth.currentUser;
         const uid = user.uid;
         var updates = {};

         updates[`/users/${uid}/invest/company${index}/aftm`] = aftm;  
         fb.db.ref().update(updates);
    }
    
    return(
        <div class="wrapper">
            <div class="company">
                <Company class ="company" name = {name}/>
            </div>
            <div class= "curinv">
                <CurInv money = {curm} class = "curinv"/>
            </div>
            <input type="text" min="0" class="input" onChange={handleChange} value={inputm}/>
            <div class = "inv">
                <input type="radio" id={name+"inv"} name={name+"select"} onClick={()=>{setInputm("0");setRadioNum(0)}}/>
                <label htmlFor={name+"inv"}>투자</label>
            </div>
            <div class = "with">
                <input type="radio" id={name+"wd"} name={name+"select"}  onClick={()=>{setInputm("0");setRadioNum(1)}}/>
                <label htmlFor={name+"wd"}>철회</label>
            </div>
            <div class="aftinv">
                <AfterInv money = {aftm}/>
            </div>
        </div>
    );
}

export default withFirebase(CompanyPage);