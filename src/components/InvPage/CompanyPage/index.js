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
                <input type="radio" id="inv" name="inv"/>
                <label for="inv">투자</label>
            </div>
            <div>
                <input type="radio" id="wd" name="wd"/>
                <label for="wd">철회</label>
            </div>
            <div>
                <input type="radio" id="cancel" name="cancel"/>
                <label for="cancel">취소</label>
            </div>
            
            <AfterInv money = {aftm}/>
        </div>
    );
}

export default CompanyPage;