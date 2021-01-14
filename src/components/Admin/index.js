import React, { Component } from 'react';
// import Time from '../../constants/time'
import { withFirebase } from '../Firebase';
import login from './getLoggedin';

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

    this.props.firebase.users().on('value', snapshot => {
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

  componentWillUnmount({users}) {
    this.props.firebase.users().off();
  }

  resetInfo = async (users) => {
    alert('reset!');
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />
        <button onClick={function(users){this.resetInfo(users)}}>RESET Users INFO</button>
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
          <strong>Invest</strong><ol>{Object.values(user['invest']).map(company=><li>[curm: {company.curm}, aftm: {company.aftm}]</li>)}</ol>
        </div>
      </li>
    ))}
  </ul>
  </>);
};

export default withFirebase(AdminPage);