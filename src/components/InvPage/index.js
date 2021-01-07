import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
import CompanyPage from './CompanyPage';
import { listenerCount } from 'process';


const InvPageBase = (props) => {
    const [curm, setCurm] = useState(0);
    const [aftm, setAftm] = useState(0);
    const [name, setName] = useState("");
    var fb = props.firebase;
    //console.log(fb);
    var user = fb.auth.currentUser;
    var updates = {};
    var curms = [0, 0, 0, 0, 0, 0];
    var aftms = [0, 0, 0, 0, 0, 0];
    var names = ["","","","","",""];
    async function getNames(i){
        const snapshot = await fb.db.ref(`/companies/${i}`).once('value')
        return snapshot.val().companyname;
    }
    //const namee = await getNames(0);
    console.log(namee);

    for(var i=0;i<6;i++){
    names[i] = fb.db.ref(`/companies/${i}`).once('value').then((snapshot) => {
        return snapshot.val();
    }).then(res=>res.companyname);
    }
    if(!user){
        console.log("no user!");
        return<div>No user!!</div>;
    }
    else{
        console.log("hey",user);
        console.log("hiahdfiahsfiahfih");
        const uid = user.uid;
        for(var i=0;i<6;i++){
            fb.db.ref('/users/'+uid+`/invest/company${i}`).once('value').then((snapshot) => {
            return snapshot.val();
            }).then(res=>{setCurm(res.curm); setAftm(res.aftm)});
            curms[i] = curm;
            aftms[i] = aftm;
            // console.log(curms,aftms);

            
        }
        console.log(curms,aftms,names);
        // console.log(null.size);

        // var curmss = index.map((i)=>{
        //     return fb.db.ref('/users/'+uid+`/invest/company${i}`).once('value').then((snapshot) => {
        //         //console.log(snapshot.val());
        //         return snapshot.val();
        //     }).then(res=>{setCurm(res.curm)});
        // })
        // console.log(curms);
        
            
    
        // }
    }
    console.log("hohoho");
    return (
        <>
            <h1>Game</h1>
            <CompanyPage/>
            <CompanyPage/>
            <CompanyPage/>
            <CompanyPage/>
            <CompanyPage/>
            <CompanyPage/>
        </>

    );

}
const InvPage = withRouter(withFirebase(InvPageBase));
export default InvPage;