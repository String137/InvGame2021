import React, { Component } from 'react';
// import Time from '../../constants/time'
import { withFirebase } from '../Firebase';

const getLoggedin = (user) => {
    var login = null;
    const fb = this.props.firebase;
    async function getlogin(){
        const snapshot = await fb.db.ref(`/users/${user.uid}/loggedin`).once('value');
        login = snapshot.val();
    }
    getlogin();

    if(login===null){
        return <h1>"Loading..."</h1>;
    }
    else{
        return <h1>{login}</h1>;
    }
}

export default withFirebase(getLoggedin);