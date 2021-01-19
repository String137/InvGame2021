import { user } from 'firebase-functions/lib/providers/auth';
import React, { Component } from 'react';
// import Time from '../../constants/time'
import { withFirebase } from '../Firebase';
import login from './getLoggedin';
import * as assets from '../../constants/money';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.db.ref('/users').once('value').then(snapshot => {
      const usersObject = snapshot.val();
      if(usersObject){
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    }
    });
  }

  componentWillUnmount() {
    this.setState({
      loading: true,
  });
  }
  setequal1 = () => {
    var updates = {};
    updates['/equal1'] = true;
    this.props.firebase.db.ref().update(updates);
  }
  setequal2 = () => {
    var updates = {};
    updates['/equal2'] = true;
    this.props.firebase.db.ref().update(updates);
  }
  setequal3 = () => {
    var updates = {};
    updates['/equal3'] = true;
    this.props.firebase.db.ref().update(updates);
  }
  setequalf = () => {
    var updates = {};
    updates['/equalf'] = true;
    this.props.firebase.db.ref().update(updates);
  }
  resetInfo = () => {
    var updates = {};
    updates['/equal1'] = false;
    updates['/equal2'] = false;
    updates['/equal3'] = false;
    updates['/equalf'] = false;
    updates['/round1submitted'] = 0;
    updates['/round2submitted'] = 0;
    updates['/round3submitted'] = 0;
    updates['/finalsubmitted'] = 0;
    
    this.props.firebase.db.ref().update(updates)
    this.state.users.map(user => this.props.firebase.user(user.uid).update({
      asset: assets.INITIAL_ASSET,
      loggedin: false,
      reward: 0,
      round1submit: false,
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
        }
        , input : 0,
      }
    }));
    alert('reset!');
    this.setState({ loading: true });

    this.props.firebase.db.ref('/users').once('value').then(snapshot => {
      const usersObject = snapshot.val();
      if(usersObject){
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    }
    });
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}
        <button onClick={this.setequal1}>Equal1</button>
        <button onClick={this.setequal2}>Equal2</button>
        <button onClick={this.setequal3}>Equal3</button>
        <button onClick={this.setequalf}>Equalf</button>
        <UserList users={users} />
        <button onClick={this.resetInfo}>RESET Users INFO</button>
      </div>
    );
  }
}

const UserList = ({ users }) => {
  return(
  <>
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <div>
          <strong>Username:</strong> {user.username} 
        </div>
        <div>
          <strong>Asset:</strong>{user.asset}
        </div>
        <div>
          <strong>Invest</strong><ol>{Object.values(user['invest']).slice(0,-1).map(company=><li>[curm: {company.curm}, aftm: {company.aftm}]</li>)}<li>Input : {user['invest']['input']}</li></ol>
        </div>
        <div>
          <strong>LoggedIn:</strong>{user.loggedin.toString()}
        </div>
        <br />
      </li>
    ))}
  </ul>
  </>);
};

export default withFirebase(AdminPage);