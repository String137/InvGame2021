import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
import CompanyPage from './CompanyPage';
import { listenerCount } from 'process';


const InvPageBase = (props) => {
    const [curms, setCurms] = useState([]);
    const [aftms, setAftms] = useState([]);
    const [names, setNames] = useState([]);
    var fb = props.firebase;
    var user = fb.auth.currentUser;
    var uid = user.uid;
    async function getNames(){
        const snapshot = await fb.db.ref(`/companies/`).once('value')
        snapshot.forEach((document)=>setNames(prev=>[document.val().companyname,...prev]));
        return snapshot;
    }
    async function getCurms(){
        const snapshot = await fb.db.ref('/users/'+uid+`/invest/`).once('value')
        snapshot.forEach((document)=>setCurms(prev=>[document.val().curm,...prev]));
        return snapshot;
    }
    async function getAftms(){
        const snapshot = await fb.db.ref('/users/'+uid+`/invest/`).once('value')
        snapshot.forEach((document)=>setAftms(prev=>[document.val().aftm,...prev]));
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
        <>
            <h1>Game</h1>
            {index.map(i => <CompanyPage key={i} name={names[i]} curm={curms[i]} aftm={aftms[i]}/>)}
        </>

    );

}
const InvPage = withRouter(withFirebase(InvPageBase));
export default InvPage;