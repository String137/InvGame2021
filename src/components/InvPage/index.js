import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
import CompanyPage from './CompanyPage';


const InvPageBase = (props) => {
    const [curms, setCurms] = useState([]);
    var fb = props.firebase;
    //console.log(fb);
    var user = fb.auth.currentUser;
    var updates = {};
    // var curms = [0, 0, 0, 0, 0, 0];
    var aftms = [0, 0, 0, 0, 0, 0];
    if(!user){
        console.log("no user!");
        return<div>No user!!</div>;
    }
    else{
        console.log("hey",user);
        console.log("hiahdfiahsfiahfih");
        const uid = user.uid;
        // for(var i=0;i<6;i++){
            var vals = fb.db.ref('/users/'+uid+`/invest/company${0}`).once('value').then((snapshot) => {
                //console.log(snapshot.val());
                //return snapshot.val();
            });
            console.log(vals);
            vals.then(res => setCurms({0:res.curm}));
            console.log("setcurm",curms);
    
        // }
    }
    console.log("hohoho");
    return (
        <>
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