import React, {useEffect, useState} from 'react';
import * as assets from '../../constants/money';
import { withAuthorization } from '../Session';
import { SignUpForm } from '../SignUp';
import { withFirebase } from "../Firebase";
import { Link, withRouter } from 'react-router-dom';
import Video1 from '../Video/video1';
import Video2 from '../Video/video2';
import Video3 from '../Video/video3';
import InvPage from '../InvPage';

const GamepageBase = () => {
    const [startTime, setStartTime] = useState(new Date().getTime());
    const [expired, setExpired] = useState(0);
    const [index, setIndex] = useState(0);
    const time = [1000, 10000000, 10000010, 1000020];
    useEffect(() => {
        if(expired <=3 ){
            console.log("useEffect is called");
            setTimeout(()=>{
                setExpired(expired+1);
            }, startTime + time[expired] - new Date().getTime());
        }
    }, [expired]);
    switch (expired){
        case 0:
            return <Video1 />;
        case 1:
            return <InvPage />;
        case 2:
            return <Video2 />;
        case 3:
            return <InvPage />;
        case 4:
            return <Video3 />;
        default:
            return <div>Game ended!!</div>;
    }
}

const GamePage = withRouter(withFirebase(GamepageBase));

export default GamePage;