import React from 'react';
import * as assets from '../../constants/money';
import { withAuthorization } from '../Session';
import { SignUpForm } from '../SignUp';
import Images1 from '../Images';
import { withFirebase } from "../Firebase";
import { Link, withRouter } from 'react-router-dom';

class GamePageBase extends React.Component {
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
            ]
        }
        this.inc = this.inc.bind(this);
    }

    async componentDidMount() {
        this.setState({ loading: true });
        console.log(this.props.firebase);
        console.log(this.props.firebase.auth.currentUser);
        var user = this.props.firebase.auth.currentUser;
        if(user==null){
            console.log("no new user");
        }
        else{
            await this.props.firebase.user(user.uid).on('value', snapshot => {
                const usersObject = snapshot.val();
                this.setState({
                username: usersObject.username,
                asset: usersObject.asset,
                mountInfo: usersObject.mountInfo,
                });
            });
        }
    }


    inc(){
        var fb = this.props.firebase;
        var user = fb.auth.currentUser;
        var updates = {};
            if(user==null){
                console.log("no new user");
            }
            else{
                console.log("heyhey", fb.db);
                const uid = user.uid;
                fb.db.ref('/users/'+uid+'/asset').once('value').then((snapshot) => {
                    var asset = snapshot.val();
                    console.log("ho...",asset);
                    updates['/users/' + uid + '/' + 'asset'] = asset + 100;
                    return fb.db.ref().update(updates);
                })
            }
    }

    render() {
        const { checked1 } = this.state;

        return (
            <div>
                <h1>Game</h1>
                <Images1 id={0}
                ></Images1>
                <button onClick={this.inc}>
                    Increment Test
                </button>
            </div>
        );
    }

    
    

}


const condition = authUser => !!authUser;

const GamePage = withRouter(withFirebase(GamePageBase));

export default GamePage;