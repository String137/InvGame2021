import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
import CompanyPage from './CompanyPage';
import { listenerCount } from 'process';
import './index.css';
import { getDefaultNormalizer } from '@testing-library/react';

const InvPageBase = (props) => {
    const [curms, setCurms] = useState([]);
    const [aftms, setAftms] = useState([]);
    const [names, setNames] = useState([]);
    const [inputsum, setInputsum] = useState([0,0,0,0,0,0,0,0]);
    const [invDone, setInvDone] = useState(false);
    const [invDoneCheck, setInvDoneCheck] = useState(true);
    

    var fb = props.firebase;
    var user = fb.auth.currentUser;
    if(user===null){
        props.history.push(ROUTES.SIGN_IN);
    }
    var uid = user.uid;
    function getInput(data, index){
        console.log("datatattataatat",data);
        var list = inputsum;
        list[index]=data;
        setInputsum(list);
        console.log(list);
    }
    async function getNames(){
        const snapshot = await fb.db.ref(`/companies/`).once('value');
        const value_list = snapshot.val().map(e=>e.companyname);
        if(names !== value_list)
        {
            setNames(value_list);
        }
        return snapshot;
    }
    async function getCurms(){
        const snapshot = await fb.db.ref('/users/'+uid+`/invest/`).once('value');
        const value_list = Object.values(snapshot.val()).map(e=>e.curm);
        if(curms !== value_list){
            setCurms(value_list);
        }
        return snapshot;
    }
    async function getAftms(){
        const snapshot = await fb.db.ref('/users/'+uid+`/invest/`).once('value');
        const value_list = Object.values(snapshot.val()).map(e=>e.aftm);
        if(aftms !== value_list){
            setAftms(value_list);
        }
        return snapshot;
    }
    

    useEffect(()=>{
        // if(names.length < 6){
        //     getNames();
        // }
        // if(curms.length < 6){
            
        //     getCurms();
        // }
        // if(aftms.length < 6){
        //     getAftms(); 
        // }
        if(invDoneCheck){
            console.log("hi");
            getNames();
            getCurms();
            getAftms();
            setInvDoneCheck(false);
        }
        if(invDone){
            setInvDone(false);
        }
        console.log("lll", inputsum);
    },[inputsum]);
    
    
    
    
    const index = [0,1,2,3,4,5,6,7];
    var companyPages = index.map(i => <div class={`comp${i}`}><CompanyPage key={i} calc={getInput} name={names[i]} curm={curms[i]} invDone={invDone} index={i}/></div>);
            
    function complete(){
        //CompanyPage.aftm
        setInvDone(true);
        setInvDoneCheck(true);
    }
    
    console.log("wawawa",companyPages[0].props.children);
    return (
        <div class="wrapper">
            <h1 class="header">Game</h1>
            {companyPages}
            <button class="button" onClick={complete}>저장</button>
        </div>

    );

}
const InvPage = withRouter(withFirebase(InvPageBase));
export default InvPage;