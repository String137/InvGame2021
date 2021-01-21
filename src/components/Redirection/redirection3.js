import React from 'react';
import { withRouter } from 'react-router-dom';
import * as RATIOS from '../../constants/money';
import { withFirebase } from '../Firebase';
import './index.css';


const Redirection3Base = (props) => {
    const fb = props.firebase;
    console.log("hihi",fb);
    const user = fb.auth.currentUser;
    if(!user){
        return (
            <div class="no">No user</div>
        )
    }
    async function setAsset(){
        const snapshot = await fb.db.ref(`/users/${user.uid}/invest/input`).once('value');
        const snapshot2 = await fb.db.ref(`/users/${user.uid}/asset`).once('value');
        const snapshot3 = await fb.db.ref(`/equal3`).once('value');
        const input = snapshot.val();
        const asset = snapshot2.val();
        const equal = snapshot3.val();
        var updates = {};
        if(equal === false){
            updates[`/users/${user.uid}/asset`] = -input + asset + RATIOS.SALARY;
        }
        updates[`/users/${user.uid}/invest/input`] = 0;
        fb.db.ref().update(updates);
    }
    async function setCompany(){
        const snapshot = await fb.db.ref(`/companies/`).once('value');
        const stocks = Object.values(snapshot.val()).map(e=>e.stock);
        const snapshot2 = await fb.db.ref(`/users/${user.uid}/invest/`).once('value');
        const curms = Object.values(snapshot2.val()).map(e=>e.curm);
        const aftms = Object.values(snapshot2.val()).map(e=>e.aftm);
        var updates = {};
        for(var index = 0; index < 8; index++){
            updates[`/companies/${index}/stock`] = stocks[index] + aftms[index] - curms[index];
        }
        const snapshot3 = await fb.db.ref('/round3submitted').once('value');
        const snapshot4 = await fb.db.ref('/loggedinUser').once('value');
        const r1s = snapshot3.val();
        const log = snapshot4.val();
        updates['/round3submitted']=r1s+1;
        if(r1s+1===log){
            updates['/equal3'] = true;
        }
        fb.db.ref().update(updates);
    }
    async function setRank(){
        var updates = {};
        //updates['/equal1']=false;
        //updates['/round1submitted']=0;
        const snapshot = await fb.db.ref('/companies/').once('value');
        const objs = snapshot.val();
        const rank = objs.sort((a, b) => a["stock"] < b["stock"] ? 1 : -1);
        for(var i=0;i<objs.length;i++){
            updates[`/companies/${rank[i]["index"]}/round3rank`]=i+1;
        }
        for(i=RATIOS.FINAL_TEAM;i<RATIOS.ROUND3_TEAM;i++){
            updates[`/companies/${rank[i]["index"]}/stock`] = -1;
        }
        fb.db.ref().update(updates);

    }
    async function getCurmsAndSet(){
        const snapshot = await fb.db.ref(`/users/${user.uid}/invest/`).once('value');
        const value_list = Object.values(snapshot.val()).map(e=>e.aftm);
        const snapshot2 = await fb.db.ref('/companies/').once('value');
        const rank_list = Object.values(snapshot2.val()).map(e=>e.round3rank);
        const snapshot3 = await fb.db.ref(`/users/${user.uid}/`).once('value');
        const curAsset = Object.values(snapshot3.val())[0];
        var updates = {}
        var reward = 0;
        for(var index = 0; index < 9; index++){
            reward += parseInt(value_list[index]*(RATIOS.ROUND3_REWARD_RATIO[rank_list[index]-1]));
        }
        updates[`/users/${user.uid}/asset`] = curAsset + reward;
        for(index = 0; index < 9; index++){
            updates[`/users/${user.uid}/invest/company${index}/curm`] = value_list[index];
            updates[`/users/${user.uid}/invest/company${index}/aftm`] = value_list[index];
        }
        fb.db.ref().update(updates);
    }
    var check = true;
    setAsset().then(()=>{
        setCompany().then(()=>{
            check = false;
        }) 
    })
    
    function catchEqual() {
        if(check){
            return;
        }
        fb.db.ref('/equal3').once('value').then((snapshot)=>{
            if(snapshot.val()===true){
                setRank().then(()=>{
                    getCurmsAndSet();
                    check = true;
                });
            }
        });
    }
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

const Redirection3 = withRouter(withFirebase(Redirection3Base));
export default Redirection3;