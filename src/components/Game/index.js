import React, {useEffect, useState} from 'react';
import * as assets from '../../constants/money';
import { withAuthorization } from '../Session';
import { SignUpForm } from '../SignUp';
import { withFirebase } from "../Firebase";
import { Link, withRouter } from 'react-router-dom';
import Round1 from './round1';
import Video1 from '../Video/video1';
import Video2 from '../Video/video2';
import Video3 from '../Video/video3';

const GamepageBase = () => {
    const [startTime, setStartTime] = useState(new Date().getTime());
    const [expired, setExpired] = useState(0);
    const [index, setIndex] = useState(0);
    const time = [5000, 7000, 9000, 11000];
    useEffect(() => {
        if(expired <=3 ){
            console.log("useEffect is called");
            setTimeout(()=>{
                setExpired(expired+1);
            }, startTime + time[expired] - new Date().getTime());
        }
    });
    switch (expired){
        case 0:
            return <Video1 />;
        case 1:
            return <Round1 />;
        case 2:
            return <Video2 />;
        case 3:
            return <Round1 />;
        case 4:
            return <Video3 />;
    
    }
}

const GamePage = withRouter(withFirebase(GamepageBase));

export default GamePage;