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

  resetInfo = () => {
    this.state.users.map(user => this.props.firebase.user(user.uid).update({
      asset: assets.INITIAL_ASSET,
      loggedin: false,
      reward: 0,
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