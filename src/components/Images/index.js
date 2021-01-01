import React from 'react';
import { withAuthorization } from '../Session';
import firebase from '../Firebase/firebase';
import * as consts from '../../constants/consts'

class Images1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
        }
    }
    render() {
          
        return (
            <div>
                images!
            <ul>
                {this.id}
            </ul>
            </div>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Images1);

/*
https://gaemi606.tistory.com/26
Images/index.js에서 Game/index.js로 파라미터 i를 전달해야함.
user.props에 pending attribute를 넣어서 pending == true인 이미지만 Game/index.js에서 처리하자.
*/