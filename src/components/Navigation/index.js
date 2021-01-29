import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import './index.css';

function isAdmin(user) {
  if (user === null) {
    return false;
  }
  return user.email === "icists@icists.org";
  /* Admin 접속 권한 수정해야함  */
}
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => {
        if (window.location.pathname === "/emailsent") {
          return <div></div>;
        }
        else {
          return ((authUser && authUser.emailVerified) || window.location.pathname === '/game') ? (isAdmin(authUser) ? <NavigationAdmin /> : <NavigationAuth />) : <NavigationNonAuth />;
        }
      }
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ul className="container">
    <div className="au0">
      <Link className="game-navigation" to={ROUTES.GAME}>GRAFFITI 투자게임</Link>
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
      <SignOutButton />
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
      <Link to={ROUTES.ADMINRANK}>RANK</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);
const NavigationNonAuth = () => (
  <></>
);

export default Navigation;