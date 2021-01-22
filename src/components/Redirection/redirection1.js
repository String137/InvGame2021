import React from 'react';
import { withRouter } from 'react-router-dom';
import * as RATIOS from '../../constants/money';
import { withFirebase } from '../Firebase';
import './index.css';


const Redirection1Base = (props) => {
    const fb = props.firebase;
    const user = fb.auth.currentUser;
    if(!user){
        return (
            <div class="no">No user</div>
        )
    }
    async function setAsset(){
        const snapshot = await fb.db.ref(`/users/${user.uid}/invest/input`).once('value');
        const snapshot2 = await fb.db.ref(`/users/${user.uid}/asset`).once('value');
        const snapshot3 = await fb.db.ref(`/equal1`).once('value');
        const input = snapshot.val();
        const asset = snapshot2.val();
        const equal = snapshot3.val();
        var updates = {};
        if(equal === false){
            updates[`/users/${user.uid}/asset`] = -input + asset + RATIOS.SALARY;
        }
        updates[`/users/${user.uid}/invest/input`] = 0;
        updates[`/users/${user.uid}/round1submitted`] = 1;
        fb.db.ref().update(updates);
    }
    async function setCompany(){
        const snapshot = await fb.db.ref(`/companies/`).once('value');
        const stocks = Object.values(snapshot.val()).map(e=>e.stock);
        const snapshot2 = await fb.db.ref(`/users/${user.uid}/invest/`).once('value');
        const curms = Object.values(snapshot2.val()).map(e=>e.curm);
        const aftms = Object.values(snapshot2.val()).map(e=>e.aftm);
        var updates = {};
        for(var index = 0; index < 9; index++){
            updates[`/companies/${index}/stock`] = stocks[index] + aftms[index] - curms[index];
        }
        const snapshot3 = await fb.db.ref('/round1submitted').once('value');
        const snapshot4 = await fb.db.ref('/loggedinUser').once('value');
        const r1s = snapshot3.val();
        const log = snapshot4.val();
        updates['/round1submitted']=r1s+1;
        updates[`/users/${user.uid}/round1submitted`] = 2;
        if(r1s+1===log){
            updates['/equal1'] = true;
        }
        fb.db.ref().update(updates);
    }
    async function setRank(){
        var updates = {};
        const snapshot = await fb.db.ref('/companies/').once('value');
        const objs = snapshot.val();
        const rank = objs.sort((a, b) => a["stock"] < b["stock"] ? 1 : -1);
        for(var i=0;i<objs.length;i++){
            updates[`/companies/${rank[i]["index"]}/round1rank`]=i+1;
        }
        for(i=RATIOS.ROUND2_TEAM;i<RATIOS.ROUND1_TEAM;i++){
            updates[`/companies/${rank[i]["index"]}/stock`] = -1;
        }
        fb.db.ref().update(updates);

    }
    async function getCurmsAndSet(){
        const snapshot = await fb.db.ref(`/users/${user.uid}/invest/`).once('value');
        const value_list = Object.values(snapshot.val()).map(e=>e.aftm);
        const snapshot2 = await fb.db.ref('/companies/').once('value');
        const rank_list = Object.values(snapshot2.val()).map(e=>e.round1rank);
        const snapshot3 = await fb.db.ref(`/users/${user.uid}/`).once('value');
        const curAsset = Object.values(snapshot3.val())[0];
        var updates = {}
        var reward = 0;
        for(var index = 0; index < 9; index++){
            reward += parseInt(value_list[index]*(RATIOS.ROUND1_REWARD_RATIO[rank_list[index]-1]));
        }
        updates[`/users/${user.uid}/asset`] = curAsset + reward;
        for(index = 0; index < 9; index++){
            updates[`/users/${user.uid}/invest/company${index}/curm`] = value_list[index];
            updates[`/users/${user.uid}/invest/company${index}/aftm`] = value_list[index];
        }
        fb.db.ref().update(updates);
    }
    async function catchsubmit() {
        console.log(user);
        
        await fb.db.ref(`/users/${user.uid}/round1submitted`).once('value').then((snapshot) => {
            if(snapshot.val()===0){
                setAsset().then(()=>{
                    setCompany().then(()=>{
                    }) 
                })
            }
        })
    }
    async function catchEqual() {
       const snapshottrue = await fb.db.ref('/equal1/').once('value');
       const snapshotget = await fb.db.ref(`/users/${user.uid}/round1getsubmit/`).once('value');
       const snapshotmit = await fb.db.ref(`/users/${user.uid}/round1submitted/`).once('value');
    //    console.log("hihi",snapshottrue.val());
       if(snapshottrue.val()===true&&snapshotget.val()===false&&snapshotmit.val()===2){
           var updates = {};
           updates[`/users/${user.uid}/round1getsubmit`]=true;
           fb.db.ref().update(updates);
        setRank().then(()=>{
            getCurmsAndSet();
        });
       }
     }
    setInterval(catchsubmit,1000);
    setInterval(catchEqual,1000);

    
    
    
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
        <div className="wait-text">영상을 시청해주세요.</div>
        </>
    );
}

const Redirection1 = withRouter(withFirebase(Redirection1Base));
export default Redirection1;