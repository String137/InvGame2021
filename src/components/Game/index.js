import React, {useEffect, useState} from 'react';
import * as assets from '../../constants/money';
import { withAuthorization } from '../Session';
import { SignUpForm } from '../SignUp';
import { withFirebase } from "../Firebase";
import { Link, withRouter } from 'react-router-dom';
import Video1 from '../Video/video1';
import Video2 from '../Video/video2';
import Video3 from '../Video/video3';
import Final from '../Video/final';
import InvPage from '../InvPage';
import Redirection1 from '../Redirection/redirection1';
import Redirection2 from '../Redirection/redirection2';
import Redirection3 from '../Redirection/redirection3';

const GamepageBase = () => {
    const [startTime, setStartTime] = useState(new Date().getTime());
    const [expired, setExpired] = useState(0);
    const [index, setIndex] = useState(0);
    const time = [1000, 30000, 40000, 41000, 70000, 80000, 81000, 110000, 120000];
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
            return <InvPage count={8} />;
        case 2:
            return <Redirection1/>;
        case 3:
            return <Video2/>;
        case 4:
            return <InvPage count={6}/>;
        case 5:
            return <Redirection2/>;
        case 6:
            return <Video3 />;
        case 7:
            return <InvPage count={4}/>;
        case 8:
            return <Redirection3/>;
        case 9:
            return <Final />;
        default:
            return <div>Game ended!!</div>;
    }
}

const GamePage = withRouter(withFirebase(GamepageBase));

export default GamePage;