import React from 'react';
import { withFirebase } from '../Firebase';
import './index.css';
import * as ROUTES from '../../constants/routes';


const SignOutButton = ({ firebase, history }) => {
  async function getLog() {
    const snapshot = await firebase.db.ref(`/loggedinUser`).once('value');
    return snapshot.val();
  }
  return (
    <button className="sb" type="button" onClick={function () {
      const user = firebase.auth.currentUser;
      getLog().then((res) => {
        var updates = {};
        updates[`/users/${user.uid}/loggedin`] = false;
        if (user.email !== "icists@icists.org") {
          updates['/loggedinUser'] = res - 1;
        }
        firebase.db.ref().update(updates);
        firebase.doSignOut();
        window.location.href = ROUTES.SIGN_IN;
      });

    }}>
      Sign Out
    </button>
  );
};

export default withFirebase(SignOutButton);