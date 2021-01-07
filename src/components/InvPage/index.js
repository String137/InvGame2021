import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
import CompanyPage from './CompanyPage';


const InvPageBase = (props) => {
    var fb = props.firebase;
    var user = fb.auth.currentUser;
    var updates = {};
    var curms = [0, 0, 0, 0, 0, 0];
    var aftms = [0, 0, 0, 0, 0, 0];
    if(!user){
        console.log("no user!");
        return<div>No user!!</div>;
    }
    else{
        const uid = user.uid;
        for(var i=0;i<6;i++){
            var vals = fb.db.ref('/users/'+uid+`/invest/company${i}`).once('value').then((snapshot, i) => {
                return snapshot.val();
            });
            console.log(vals);
    
        }
    }
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