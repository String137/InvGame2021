import React, {useState} from 'react';
import Company from './Company';
import AfterInv from './AfterInv';
import CurInv from './CurInv';
import Input from './Input';
const CompanyPage = ({curm, name, aftm}) => {
    const [inputm, setInputm] = useState(0);
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
    return(
        <div>
            <Company name = {name} className = "company"/>
            <CurInv money = {curm} className = "curinv"/>
            <input type="number" class="input" onChange={handleChange} value={inputm}/>
            <div>
                <input type="radio" id={name+"inv"} name={name+"select"}/>
                <label htmlFor={name+"inv"}>투자</label>
            </div>
            <div>
                <input type="radio" id={name+"wd"} name={name+"select"}/>
                <label htmlFor={name+"wd"}>철회</label>
            </div>
            <div>
                <input type="radio" id={name+"cancel"} name={name+"select"}/>
                <label htmlFor={name+"cancel"}>취소</label>
            </div>
            
            <AfterInv money = {parseInt(curm)+ (inputm ? parseInt(inputm) :  0)}/>
        </div>
    );
}

export default CompanyPage;