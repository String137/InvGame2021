import React from 'react';
import { Link, Router } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import './index.css';
 
function isAdmin(user){
  console.log(user);
  return user.email === "icists@icists.org";
  /* Admin 접속 권한 수정해야함  */
}
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => {
        console.log("authUser", authUser);
        if(window.location.pathname==="/emailsent"){
          return <div>Verification Link Sent to Email</div>;
        }
        else{
          return (authUser && authUser.emailVerified) ? (isAdmin(authUser) ? <NavigationAdmin/> : <NavigationAuth /> ) : <NavigationNonAuth />;
        }
      }
      }
    </AuthUserContext.Consumer>
 </div>
);

const NavigationAuth = () => (
    <ul className="container">
      <div className="au0">
        <Link className="game-navigation" to={ROUTES.GAME}>GRAFFITI INVESTMENT GAME</Link>
      </div>
      {/* <div className="au1">
        <Link to={ROUTES.LANDING} class="l1">Landing</Link>
      </div>
      <div className="au2">
        <Link to={ROUTES.HOME} class="l1">Home</Link>
      </div>
      <div className="au3">
        <Link to={ROUTES.ACCOUNT} class="l1">Account</Link>
      </div>
      <div className="au4">
        <Link to={ROUTES.GAME} class="l1">Game</Link>
      </div> */}
      <div className="au5">
        <SignOutButton/>
      </div>
    </ul>
);
const NavigationAdmin = () => (
  <ul>
    <li>
      <Link to={ROUTES.ADMIN}>Users</Link>
    </li>
    <li>
      <Link to={ROUTES.COMPANY}>Companies</Link>
    </li>
    <li>
      <SignOutButton/>
    </li>
  </ul>
);
const NavigationNonAuth = () => (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
);
 
export default Navigation;