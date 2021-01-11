import React from 'react';
import { withRouter } from 'react-router-dom';
import * as RATIOS from '../../constants/money';
import { withFirebase } from '../Firebase';
import './index.css';


const Redirection1Base = (props) => {
    const fb = props.firebase;
    console.log("hihi",fb);
    const user = fb.auth.currentUser;
    if(!user){
        return (
            <div class="no">No user</div>
        )
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
        console.log(RATIOS.ROUND1_REWARD_RATIO[7]);
        console.log("vlavalvalvl",value_list);
        console.log("rararar",rank_list);
        for(var index = 0; index < 8; index++){
            reward += parseInt(value_list[index]*RATIOS.ROUND1_REWARD_RATIO[rank_list[index]-1]);
        }
        console.log("asafdsadfs",reward);
        updates[`/users/${user.uid}/asset`] = curAsset + reward;
        for(index = 0; index < 8; index++){
            updates[`/users/${user.uid}/invest/company${index}/curm`] = value_list[index];
            updates[`/users/${user.uid}/invest/company${index}/aftm`] = value_list[index];
        }
        fb.db.ref().update(updates);
    }
    getCurmsAndSet();
    
    
    return (
        <div className="container"><h1 className="wait">Wait...</h1></div>
        
    );
}

const Redirection1 = withRouter(withFirebase(Redirection1Base));
export default Redirection1;