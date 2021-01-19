import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';

const RankBase = ({firebase}) => {
    const [userList, setUserList] = useState([]);

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

    getRank();

    console.log("Rank", userList);
    return <ol>{userList.map(res=><li>{res["username"]}: ${res["asset"]}</li>)}</ol>
}

var Rank = withRouter(withFirebase(RankBase));
export default Rank;