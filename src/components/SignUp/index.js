import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
import './index.css';

const SignUpPage = () => (
  <>
    <div className="signup-title">
      <h1>SignUp</h1>
      <br />
      <Link to="/">뒤로 가기</Link>
    </div>
    <div className="signup-container">
      <SignUpForm />
    </div>
  </>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  radio: 0,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit1 = event => {
    const { username, email, passwordOne } = this.state;
    // console.log("sign in!!",this);
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
            loggedin: false,
            reward: 0,
            round1submitted: 0,
            round1getsubmit: false,
            round2submitted: 0,
            round2getsubmit: false,
            round3submitted: 0,
            round3getsubmit: false,
            finalsubmitted: 0,
            finalgetsubmit: false,
            online: this.state.radio === 1,
            invest: {
              company0: {
                curm: 0,
                aftm: 0,
              },
              company1: {
                curm: 0,
                aftm: 0,
              },
              company2: {
                curm: 0,
                aftm: 0,
              },
              company3: {
                curm: 0,
                aftm: 0,
              },
              company4: {
                curm: 0,
                aftm: 0,
              },
              company5: {
                curm: 0,
                aftm: 0,
              },
              company6: {
                curm: 0,
                aftm: 0,
              },
              company7: {
                curm: 0,
                aftm: 0,
              },
              company8: {
                curm: 0,
                aftm: 0,
              }
              , input: 0
            }
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        //this.props.history.push(ROUTES.EMAIL_HAS_BEEN_SENT);
        let user = this.props.firebase.auth.currentUser;
        user.sendEmailVerification().then(function () {
          window.location.href = ROUTES.EMAIL_HAS_BEEN_SENT;
        }).catch(function (error) {
          // console.log(error);
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
      username === '' ||
      this.state.radio === 0;

    return (
      <>
        <form className="signup-form" onSubmit={this.onSubmit1}>
          <p>Name</p>
          <input
            className="signup-username"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <p>Email</p>
          <input
            className="signup-email"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <p>Password</p>
          <input
            className="signup-password-one"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <p>Password Confimation</p>
          <input
            className="signup-password-two"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <input className="online-radio" type="radio" id="online" onClick={() => { this.setState({ radio: 1 }) }} checked={this.state.radio === 1} />
          <label className="online-text" htmlFor="online">온라인</label>
          <input className="blend-radio" type="radio" id="blend" onClick={() => { this.setState({ radio: 2 }) }} checked={this.state.radio === 2} />
          <label className="blend-text" htmlFor="blend">블렌딩</label>
          <button className="email-send" disabled={isInvalid} type="submit">
            Send Verification Link to Email
        </button>

          {error && <p>{error.message}</p>}
        </form>

      </>
    );
  }
}

const SignUpLink = () => (
  <label className="route-to-signup">
    <Link className="link-to-signup" to={ROUTES.SIGN_UP}>Sign Up</Link>
  </label>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };