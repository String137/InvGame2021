import React from 'react';
import * as assets from '../../constants/money';
import { withAuthorization } from '../Session';
import firebase from '../Firebase/firebase';
import Images1 from '../Images';

class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            round: 1,
            checked1: [
                {id: 0, checked: false},
                {id: 1, checked: false},
                {id: 2, checked: false},
                {id: 3, checked: false},
                {id: 4, checked: false},
                {id: 5, checked: false},
                {id: 6, checked: false},
                {id: 7, checked: false},
            ],
            pending1: [
                {id: 0, pending: false},
                {id: 1, pending: false},
                {id: 2, pending: false},
                {id: 3, pending: false},
                {id: 4, pending: false},
                {id: 5, pending: false},
                {id: 6, pending: false},
                {id: 7, pending: false},
            ]
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        console.log(this);
        console.log("firebase",firebase);
        await this.props.firebase.user(this.props.firebase.auth.currentUser.uid).on('value', snapshot => {
            const usersObject = snapshot.val();
            this.setState({
                checked1: usersObject.checked1,
            });
        });
    }


    render() {
        const { checked1 } = this.state;

        return (
            <div>
                <h1>Game</h1>
            <Images1 id={0}
            ></Images1>
            </div>
        );
    }

    

}


const condition = authUser => !!authUser;

export default GamePage;