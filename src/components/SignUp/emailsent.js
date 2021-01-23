import React from 'react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './index.css';

const EmailSent = ({ firebase }, props) => (
    <>
        <div className="verficationsent-container">
            <h1 className="verification-link-sent-text">Verification Link Sent</h1>
            <button className="go-to-signin" type="button" onClick={function(){
                firebase.doSignOut();
                window.location.href=ROUTES.SIGN_IN;
            }}>
                Go to Signin
            </button>
        </div>
    </>
);

export default withFirebase(EmailSent);