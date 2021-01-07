import React from 'react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const EmailSent = ({ firebase }, props) => (
    <>
        <div>Verification Link Sent to Email</div>
        <button type="button" onClick={function(){
            firebase.doSignOut();
            window.location.href=ROUTES.SIGN_IN;
        }}>
            Go to Signin
        </button>
    </>
);

export default withFirebase(EmailSent);