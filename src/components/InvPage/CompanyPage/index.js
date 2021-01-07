import React from 'react';
import Company from './Company';
import AfterInv from './AfterInv';
import CurInv from './CurInv';
import Input from './Input';
const CompanyPage = ({curm, name, aftm}) => {
    return(
        <div>
            <Company name = {name} class = "company"/>
            <CurInv money = {curm} class = "curinv"/>
            <Input class="input"/>
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
            
            <AfterInv money = {aftm}/>
        </div>
    );
}

export default CompanyPage;