import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit1 = event => {
    const { username, email, passwordOne } = this.state;
    console.log("sign in!!",this);
    this.props.firebase
    .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            asset: assets.INITIAL_ASSET,
            reward: 0,
            invest: {
              company0: {
                curm: 0,
              },
              company1: {
                curm: 0,
              },
              company2: {
                curm: 0,
              },
              company3: {
                curm: 0,
              },
              company4: {
                curm: 0,
              },
              company5: {
                curm: 0,
              },
            }
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        //this.props.history.push(ROUTES.EMAIL_HAS_BEEN_SENT);
        let user = this.props.firebase.auth.currentUser;
        user.sendEmailVerification().then(function() {
          window.location.href=ROUTES.EMAIL_HAS_BEEN_SENT;
        }).catch(function(error) {
          console.log(error);
        });
      })
      .catch(error => {
        this.setState({ error });
      });
    
    event.preventDefault();
  };
  
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div>
      <form onSubmit={this.onSubmit1}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Send
        </button>

        {error && <p>{error.message}</p>}
      </form>
      
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };