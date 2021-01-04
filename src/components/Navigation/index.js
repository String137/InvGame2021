import React from 'react';
import { Link } from 'react-router-dom';
 
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
 
function isAdmin(user){
  console.log(user);
  return user.email === "icists@icists.org";
  /* Admin 접속 권한 수정해야함  */
}
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => 
        authUser ? (isAdmin(authUser) ? <NavigationAdmin/> : <NavigationAuth /> ) : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
 </div>
);

const NavigationAuth = () => (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.GAME}>Game</Link>
      </li>
      <li>
        <SignOutButton/>
      </li>
    </ul>
);
const NavigationAdmin = () => (
  <ul>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
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