import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';

const RankBase = ({firebase}) => {
    const [userList, setUserList] = useState([]);
    const [companyList, setCompanyList] = useState([]);

    async function getRank(){
        //updates['/equal1']=false;
        //updates['/round1submitted']=0;
        const snapshot = await firebase.db.ref('/users/').once('value');
        const objs = snapshot.val();
        const userRankList = Object.values(objs).sort((a, b) => a[`asset`] > b[`asset`] ? -1 : 1);
        if(!(JSON.stringify(userList) === JSON.stringify(userRankList.map(res=>res)))){
            setUserList(userRankList.map(res=>res));
        }
    }
    async function getCompany(){
        const snapshot = await firebase.db.ref('/companies/').once('value');
        const objs = snapshot.val();
        const companyRankList = Object.values(objs).sort((a, b) => a[`finalrank`] > b[`finalrank`] ? 1 : -1);
        if(!(JSON.stringify(companyList) === JSON.stringify(companyRankList.map(res=>res)))){
            setCompanyList(companyRankList.map(res=>res));
        }
    }
    getRank();
    getCompany();
    // console.log("Rank", userList);
    return (
        <div>
            <ol>{userList.map(res=><li>{res["username"]}: ${res["asset"]}</li>)}</ol>
            <ol>{companyList.slice(0,3).map(res=><li>{res["companyname"]}: {res["finalrank"]}</li>)}</ol>
        </div>
    );
}

var Rank = withRouter(withFirebase(RankBase));
export default Rank;