import React from 'react';
import { withRouter } from 'react-router-dom';
import * as RATIOS from '../../constants/money';
import { withFirebase } from '../Firebase';
import './index.css';


const RedirectionFBase = (props) => {
    const fb = props.firebase;
    const user = fb.auth.currentUser;
    if (!user) {
        return (
            <div className="no">No user</div>
        )
    }
    async function setAsset() {
        const snapshot = await fb.db.ref(`/users/${user.uid}/invest/input`).once('value');
        const snapshot2 = await fb.db.ref(`/users/${user.uid}/asset`).once('value');
        const snapshot3 = await fb.db.ref(`/equalf`).once('value');
        const input = snapshot.val();
        const asset = snapshot2.val();
        const equal = snapshot3.val();
        var updates = {};
        if (equal === false) {
            updates[`/users/${user.uid}/asset`] = -input + asset;
        }
        updates[`/users/${user.uid}/invest/input`] = 0;
        updates[`/users/${user.uid}/finalsubmitted`] = 1;
        fb.db.ref().update(updates);
    }
    async function setCompany() {
        const snapshot = await fb.db.ref(`/companies/`).once('value');
        // const stocks = Object.values(snapshot.val()).map(e => e.stock);
        const snapshot2 = await fb.db.ref(`/users/${user.uid}/invest/`).once('value');
        const curms = Object.values(snapshot2.val()).map(e => e.curm);
        const aftms = Object.values(snapshot2.val()).map(e => e.aftm);
        var updates = {};
        fb.db.ref(`/companies/0/stock`).transaction((param) => {
            return param + aftms[0] - curms[0];
        });
        fb.db.ref(`/companies/1/stock`).transaction((param) => {
            return param + aftms[1] - curms[1];
        });
        fb.db.ref(`/companies/2/stock`).transaction((param) => {
            return param + aftms[2] - curms[2];
        });
        fb.db.ref(`/companies/3/stock`).transaction((param) => {
            return param + aftms[3] - curms[3];
        });
        fb.db.ref(`/companies/4/stock`).transaction((param) => {
            return param + aftms[4] - curms[4];
        });
        fb.db.ref(`/companies/5/stock`).transaction((param) => {
            return param + aftms[5] - curms[5];
        });
        fb.db.ref(`/companies/6/stock`).transaction((param) => {
            return param + aftms[6] - curms[6];
        });
        fb.db.ref(`/companies/7/stock`).transaction((param) => {
            return param + aftms[7] - curms[7];
        });
        fb.db.ref(`/companies/8/stock`).transaction((param) => {
            return param + aftms[8] - curms[8];
        });

        updates[`/users/${user.uid}/finalsubmitted`] = 2;
        fb.db.ref().update(updates);
    }
    async function setRank() {
        var updates = {};
        const snapshot = await fb.db.ref('/companies/').once('value');
        const objs = snapshot.val();
        const rank = objs.sort((a, b) => parseInt(a["stock"]) < parseInt(b["stock"]) ? 1 : -1);
        for (var i = 0; i < objs.length; i++) {
            updates[`/companies/${rank[i]["index"]}/finalrank`] = i + 1;
        }

        fb.db.ref().update(updates);

    }
    async function getCurmsAndSet() {
        const snapshot = await fb.db.ref(`/users/${user.uid}/invest/`).once('value');
        const value_list = Object.values(snapshot.val()).map(e => e.aftm);
        const snapshot2 = await fb.db.ref('/companies/').once('value');
        const rank_list = Object.values(snapshot2.val()).map(e => e.finalrank);
        const snapshot3 = await fb.db.ref(`/users/${user.uid}/`).once('value');
        const curAsset = Object.values(snapshot3.val())[0];
        var updates = {}
        var reward = 0;
        for (var index = 0; index < 9; index++) {
            reward += parseInt(value_list[index] * (1 + RATIOS.FINAL_REWARD_RATIO[rank_list[index] - 1]));
        }
        updates[`/users/${user.uid}/asset`] = curAsset + reward;
        for (index = 0; index < 9; index++) {
            updates[`/users/${user.uid}/invest/company${index}/curm`] = value_list[index];
            updates[`/users/${user.uid}/invest/company${index}/aftm`] = value_list[index];
        }
        fb.db.ref().update(updates);
    }
    async function catchsubmit() {

        await fb.db.ref(`/users/${user.uid}/finalsubmitted`).once('value').then((snapshot) => {
            if (snapshot.val() === 0) {
                setAsset().then(() => {
                    setCompany().then(() => {
                    })
                })
                clearInterval(cs);
            }
        })
    }
    async function catchEqual() {
        const snapshottrue = await fb.db.ref('/equalf/').once('value');
        const snapshotget = await fb.db.ref(`/users/${user.uid}/finalgetsubmit/`).once('value');
        const snapshotmit = await fb.db.ref(`/users/${user.uid}/finalsubmitted/`).once('value');
        if (snapshottrue.val() === true && snapshotget.val() === false && (snapshotmit.val() === 2 || snapshotmit.val() === 3)) {
            var updates = {};
            updates[`/users/${user.uid}/finalgetsubmit`] = true;
            fb.db.ref().update(updates);
            setRank().then(() => {
                getCurmsAndSet();
            });
            clearInterval(ce);
        }
    }
    async function updatesubmit() {
        const snapshot = await fb.db.ref(`/users/${user.uid}/finalsubmitted/`).once('value');
        if (snapshot.val() !== 2) {
            return;
        }
        // else {
        //     var snap = await fb.db.ref('/finalsubmitted');
        //     snap.transaction(function (param) {
        //         return param + 1;
        //     })
        //     fb.db.ref(`/users/${user.uid}`).update({ finalsubmitted: 3 });
        //     clearInterval(us);
        // }
        else {
            fb.db.ref(`/users/${user.uid}`).update({ finalsubmitted: 3 });
            clearInterval(us);
            var snap = await fb.db.ref('/finalsubmitted');
            snap.transaction(function (param) {
                return param + 1;
            });
        
        }
    }
    async function setequal() {
        const snapshot = await fb.db.ref('/finalsubmitted/').once('value');
        const snapshot2 = await fb.db.ref('/loggedinUser/').once('value');
        if (snapshot.val() === snapshot2.val()) {
            fb.db.ref('/').update({ equalf: true });
            clearInterval(se);
        }
    }
    var cs = setInterval(catchsubmit, 1000);
    var ce = setInterval(catchEqual, 1000);
    var us = setInterval(updatesubmit, 1000);
    var se = setInterval(setequal, 1000);


    return (
        <>
            <div className="loading-container">
                <div className="wait1"></div>
                <div className="wait2"></div>
                <div className="wait3"></div>
                <div className="wait4"></div>
                <div className="wait5"></div>
                <div className="wait6"></div>
                <div className="wait7"></div>
                <div className="wait8"></div>
                <div className="wait9"></div>
                <div className="wait10"></div>
            </div>
            <div className="wait-text">곧 집계가 끝납니다.</div>
        </>

    );
}

const RedirectionF = withRouter(withFirebase(RedirectionFBase));
export default RedirectionF;