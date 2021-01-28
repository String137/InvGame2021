import React from 'react';
import { withFirebase } from '../Firebase';
import './index.css';
import * as ROUTES from '../../constants/routes';


const SignOutButton = ({ firebase, history }) => {
  return (
    <button className="sb" type="button" onClick={function () {
      const user = firebase.auth.currentUser;
      firebase.db.ref(`/users/${user.uid}`).update({ loggedin: false });
      if (user.email !== "icists@icists.org") {
        // firebase.db.ref('/loggedinUser').transaction(function (param) {
        //     return param - 1;
        //   });
          
        // firebase.db.ref().update(updates);
      }
      firebase.doSignOut();
          window.location.href = ROUTES.SIGN_IN;
        
    }}>
      Sign Out
    </button >
  );
};

export default withFirebase(SignOutButton);