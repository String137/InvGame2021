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
export var sum = 0;
const CompanyPage = ({curm, name, invDone, index, calc, firebase}) => {
    var aftm = 0;
    const [inputm, setInputm] = useState("0");
    const [radioNum, setRadioNum] = useState(0);
    const handleChange = (event) => {
        console.log(event);
        console.log("alfsdkjslkdjfalksfdjlakdj");
        const {target: {value}} = event;
        if(!isNaN(parseInt(value))){
            console.log("adfs",typeof(value));
            console.log(value);
            //console.log(value.replace(/^0+/,''));
            setInputm(value.replace(/^0+(?=\d)/, ''));
            console.log(typeof(value.replace(/^0+(?=\d)/, '')))
            console.log(inputm);
        }
        else{
            console.log("n");
            setInputm("0");
        }
        console.log("why",inputm);
        //calc(parseInt(value.replace(/^0+(?=\d)/, '')), index);
    }
    useEffect(()=>{
        console.log(inputm);
        calc(parseInt(inputm), index);
    })
    switch (radioNum){
        case 0:
            aftm = parseInt(curm) + (inputm ? parseInt(inputm) :  0);
            break;
        case 1:
            aftm = parseInt(curm) - (inputm ? parseInt(inputm) :  0);
            break;
        case 2:
            aftm = parseInt(curm);
            break;
        default:
            aftm = 0;
    }
    if (invDone) {
         const fb =  firebase;
         console.log(fb);
         const user = fb.auth.currentUser;
         const uid = user.uid;
         var updates = {}

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
            <input type="number" min="0" class="input" onChange={handleChange} value={inputm}/>
            <div class = "inv">
                <input type="radio" id={name+"inv"} name={name+"select"} onClick={()=>{setRadioNum(0)}}/>
                <label htmlFor={name+"inv"}>투자</label>
            </div>
            <div class = "with">
                <input type="radio" id={name+"wd"} name={name+"select"}  onClick={()=>{setRadioNum(1)}}/>
                <label htmlFor={name+"wd"}>철회</label>
            </div>
            <div class="aftinv">
                <AfterInv money = {aftm}/>
            </div>
        </div>
    );
}

export default withFirebase(CompanyPage);