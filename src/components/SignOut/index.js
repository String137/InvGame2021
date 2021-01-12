import React from 'react';
import { withFirebase } from '../Firebase';
import './index.css';
import * as ROUTES from '../../constants/routes';

const SignOutButton = ({ firebase, history }) => (
  <button class="sb" type="button" onClick={function(){
    firebase.doSignOut();
    window.location.href=ROUTES.SIGN_IN;
  }}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);