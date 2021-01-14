import React from 'react';
import { withFirebase } from '../../Firebase';


class AdminCompany extends React.Component {
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
        console.log("user", usersObject);
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
        this.props.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;

        return (
        <div>
            <h1>Admin</h1>

            {loading && <div>Loading ...</div>}

            <CompanyList users={users} />
            <button onClick={function(){console.log("hi")}}>SET START TIME</button>
        </div>
        );
    }
}

const CompanyList = ({ users }) => (
<ul>
    {users.map(user => (
    <li key={user.uid}>
        <span>
        <strong>Username:</strong> {user.username} <br/>
        </span>
        <span>
        <strong>E-Mail:</strong> {user.email} <br/>
        </span>
        <span>
        <strong>ID:</strong> {user.uid} <br/>
        </span>
    </li>
    ))}
</ul>
);

export default withFirebase(AdminCompany);