import React from 'react';
import * as assets from '../../constants/money';
import { withAuthorization } from '../Session';
import firebase from '../Firebase/firebase'



class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "name loading...",
      asset: assets.INITIAL_ASSET,
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.props.firebase.user(this.props.firebase.auth.currentUser.uid).on('value', snapshot => {
      const usersObject = snapshot.val();
      this.setState({
        username: usersObject.username,
        asset: usersObject.asset,
      });
    });
    
  }

  render() {
    const { username, asset } = this.state;

    if (this.props.firebase.auth.currentUser != null) {
      this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child("messages").child("front").on('value', snapshot => {
        this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child("messages").transaction(snapshot => {
          if(snapshot==null){
            console.log('messages null!!!');
            return snapshot;
          }
          if(snapshot.queue==undefined)
            return snapshot;
          while(snapshot.front<snapshot.queue.length-1){
            
            snapshot.front++;
            alert(snapshot.queue[snapshot.front]);
          
          }
          return snapshot;

        }
        )
      });
    }

    return (
      <div>
        <h1>Home Page</h1>
        <h1>{username} 님의 잔고 ${asset}</h1>
      </div>
    );
  }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);