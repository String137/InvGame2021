import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import './index.css';

const RankBase = ({ firebase }) => {
    const [userList, setUserList] = useState([]);
    const [companyList, setCompanyList] = useState([]);

    async function getRank() {
        const snapshot = await firebase.db.ref('/users/').once('value');
        const objs = snapshot.val();
        const userRankList = Object.values(objs).sort((a, b) => a[`asset`] > b[`asset`] ? -1 : 1);
        if (!(JSON.stringify(userList) === JSON.stringify(userRankList.map(res => res)))) {
            setUserList(userRankList.map(res => res));
        }
    }
    async function getCompany() {
        const snapshot = await firebase.db.ref('/companies/').once('value');
        const objs = snapshot.val();
        const companyRankList = Object.values(objs).sort((a, b) => a[`finalrank`] > b[`finalrank`] ? 1 : -1);
        if (!(JSON.stringify(companyList) === JSON.stringify(companyRankList.map(res => res)))) {
            setCompanyList(companyRankList.map(res => res));
        }
    }
    getRank();
    getCompany();
    function three(num) {
        if (num < 10) {
            return "00" + num;
        }
        else if (num < 100) {
            return "0" + num;
        }
        else return num;
    }
    function putcommas(num) {
        var res = "";
        while (num > 0) {
            if(num>=1000){
                res = "," + three(num%1000) + res;
            }
            else{
                res = num%1000 + res;
            }
            num=parseInt(num/1000);
        }
        return res;
    }
    return (
        <div className="final-rank-page-container">
            <div className="rank-left-header-container">
                <div className="rank-left-header-text">
                    Finished
                </div>
            </div>
            <div className="final-rank-container">
                <h1 className="final-rank-text">결과발표!</h1>
                <hr />
                <div className="final-rank-header">
                    참가자 순위
                </div>
                <div className="final-user-rank">
                    {userList.slice(0,10).map(res => <div>{res["online"]?"🙋":"👨‍👦‍👦"}{res["username"]}: {putcommas(res["asset"])}원</div>)}
                </div>
                <div className="final-rank-header">
                    스타트업 순위
                </div>
                <div className="final-company-rank">
                    {companyList.slice(0, 3).map(res => <div>{res["companyname"]}: {res["finalrank"]}</div>)}
                </div>
            </div>
        </div>
    );
}

var Rank = withRouter(withFirebase(RankBase));
export default Rank;