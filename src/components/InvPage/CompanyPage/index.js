import React, { useEffect, useState } from 'react';
import Company from './Company';
import AfterInv from './AfterInv';
import CurInv from './CurInv';
import './index.css';
import { withFirebase } from '../../Firebase';
export var sum = 0;
const CompanyPage = ({ curm, name, invDone, index, calc, firebase, aftm }) => {
    //var aftm = 0;
    // curm = aftm;
    const [inputm, setInputm] = useState("0");
    const [radioNum, setRadioNum] = useState(0);
    const handleChange = (event) => {
        const { target: { value } } = event;
        
        if (radioNum !== 0 && radioNum !== 1) {
            alert("please check!");
            setInputm("0");
        }
        else if (!isNaN(parseInt(value))) {
        
            var parsed = value;
            parsed = parsed.replace(/^0+(?=\d)/, '').replace(/[^0-9]/, '');

            if (radioNum === 1) {

                if (parseInt(parsed) > curm) {
                    alert("hey!");
                    setInputm(prev => prev);
                }
                else {
                    setInputm(parsed);
                }
            }
            else {
                setInputm(parsed);
            }
        }
        else {
            setInputm("0");
        }
    }
    useEffect(() => {
        calc(parseInt(inputm), index, radioNum);
    })
    switch (radioNum) {
        case 0:
            aftm = parseInt(curm) + (inputm ? parseInt(inputm) : 0);
            break;
        case 1:
            aftm = parseInt(curm) - (inputm ? parseInt(inputm) : 0);
            break;
        default:
            aftm = parseInt(curm);
            break;
    }
    if (invDone) {
        const fb = firebase;
        const user = fb.auth.currentUser;
        const uid = user.uid;
        var updates = {};

        updates[`/users/${uid}/invest/company${index}/aftm`] = aftm;
        fb.db.ref().update(updates);
    }
   
    return (
        <div className="wrapper">
            <div className="company-logo">

            </div>
            <div className="company">
                <Company className="company" name={name} />
            </div>
            <input type="text" min="0" className="input" onChange={handleChange} value={inputm} />
            <div className="invest-withdraw">
                <div className="invest">
                    <input className="invest-radio" type="radio" id={name + "inv"} name={name + "select"} onClick={() => { setInputm("0"); setRadioNum(0) }} checked={radioNum===0}/>
                    <label className="invest-text" htmlFor={name + "inv"}>투자</label>
                </div>
                <div className="withdraw">
                    <input className="withdraw-radio" type="radio" id={name + "wd"} name={name + "select"} onClick={() => { setInputm("0"); setRadioNum(1) }} checked={radioNum===1}/>
                    <label className="withdraw-text" htmlFor={name + "wd"}>철회</label>
                </div>
            </div>
            <div className="curinv-text">curm</div>
            <div className="curinv">
                <CurInv money={curm} className="curinv" />
            </div>
            <div className="aftinv-text">aftm</div>
            <div className="aftinv">
                <AfterInv money={aftm} />
            </div>
        </div>
    );
}

export default withFirebase(CompanyPage);