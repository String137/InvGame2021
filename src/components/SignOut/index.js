import React from 'react';
import { withFirebase } from '../Firebase';
import './index.css';
const SignOutButton = ({ firebase }) => (
  <button class="sb" type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);