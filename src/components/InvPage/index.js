import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
import CompanyPage from './CompanyPage';
import { listenerCount } from 'process';
import './index.css';

const InvPageBase = (props) => {
    const [curms, setCurms] = useState([]);
    const [aftms, setAftms] = useState([]);
    const [names, setNames] = useState([]);
    
    var fb = props.firebase;
    var user = fb.auth.currentUser;
    var uid = user.uid;
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
    

    
    
    if(names.length < 6){
        getNames();
    }
    if(curms.length < 6){
        getCurms();
    }
    if(aftms.length < 6){
        getAftms();
    }
    
    
    const index = [0,1,2,3,4,5];

    // }
    return (
        <div class="wrapper">
            <h1>Game</h1>
            {index.map(i => <div class={`comp${i}`}><CompanyPage key={i} name={names[i]} curm={curms[i]} aftm={aftms[i]}/></div>)}
        </div>

    );

}
const InvPage = withRouter(withFirebase(InvPageBase));
export default InvPage;