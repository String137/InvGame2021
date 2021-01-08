import React, {useState} from 'react';
import Company from './Company';
import AfterInv from './AfterInv';
import CurInv from './CurInv';
import Input from './Input';
import './index.css';
const CompanyPage = ({curm, name}) => {
    var aftm = 0;
    const [inputm, setInputm] = useState(0);
    const [radioNum, setRadioNum] = useState(0);
    const handleChange = (event) => {
        console.log(event);
        const {target: {value}} = event;
        if(!isNaN(parseInt(value))){
            setInputm(parseInt(value));
        }
        else{
            setInputm(parseInt(prev=>prev));
        }
    }
    
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
    return(
        <div class="wrapper">
            <Company name = {name} class = "company"/>
            <CurInv money = {curm} class = "curinv"/>
            <input type="number" class="input" onChange={handleChange} value={inputm}/>
            <div>
                <input type="radio" id={name+"inv"} name={name+"select"} class = "inv" onClick={()=>{setRadioNum(0)}}/>
                <label htmlFor={name+"inv"}>투자</label>
            </div>
            <div>
                <input type="radio" id={name+"wd"} name={name+"select"} class = "with" onClick={()=>{setRadioNum(1)}}/>
                <label htmlFor={name+"wd"}>철회</label>
            </div>
            
            <AfterInv money = {aftm} class="aftinv"/>
        </div>
    );
}

export default CompanyPage;