import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import './index.css';


const Redirection0Base = (props) => {
    const fb = props.firebase;
    const user = fb.auth.currentUser;
    if(!user){
        return (
            <div class="no">No user</div>
        )
    }
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

const Redirection0 = withRouter(withFirebase(Redirection0Base));
export default Redirection0;