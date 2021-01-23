import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './index.css';

function two(num) {
    if(num<10){
        return "0"+num;
    }
    else{
        return num;
    }
}
const TimeSlot1 = ({leftTime}) => {
    const [time, setTime] = useState(leftTime);

    useEffect(()=>{
        if(time >= 1000){
            setTimeout(()=>{
                setTime(prev=>prev-1000);
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time/60000)} : {two(parseInt(time/1000) - 60 * parseInt(time/60000))}</div>
}

const TimeSlot2 = ({leftTime}) => {
    const [time, setTime] = useState(leftTime);

    useEffect(()=>{
        if(time >= 1000){
            setTimeout(()=>{
                setTime(prev=>prev-1000);
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time/60000)} : {two(parseInt(time/1000) - 60 * parseInt(time/60000))}</div>
}

const TimeSlot3 = ({leftTime}) => {
    const [time, setTime] = useState(leftTime);

    useEffect(()=>{
        if(time >= 1000){
            setTimeout(()=>{
                setTime(prev=>prev-1000);
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time/60000)} : {two(parseInt(time/1000) - 60 * parseInt(time/60000))}</div>
}

const TimeSlot4 = ({leftTime}) => {
    const [time, setTime] = useState(leftTime);

    useEffect(()=>{
        if(time >= 1000){
            setTimeout(()=>{
                setTime(prev=>prev-1000);
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time/60000)} : {two(parseInt(time/1000) - 60 * parseInt(time/60000))}</div>
}

const TimeSlot5 = ({leftTime}) => {
    const [time, setTime] = useState(leftTime);

    useEffect(()=>{
        if(time >= 1000){
            setTimeout(()=>{
                setTime(prev=>prev-1000);
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time/60000)} : {two(parseInt(time/1000) - 60 * parseInt(time/60000))}</div>
}

const TimeSlot6 = ({leftTime}) => {
    const [time, setTime] = useState(leftTime);

    useEffect(()=>{
        if(time >= 1000){
            setTimeout(()=>{
                setTime(prev=>prev-1000);
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time/60000)} : {two(parseInt(time/1000) - 60 * parseInt(time/60000))}</div>
}

const TimeSlot7 = ({leftTime}) => {
    const [time, setTime] = useState(leftTime);

    useEffect(()=>{
        if(time >= 1000){
            setTimeout(()=>{
                setTime(prev=>prev-1000);
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time/60000)} : {two(parseInt(time/1000) - 60 * parseInt(time/60000))}</div>
}
const TimeSlot8 = ({leftTime}) => {
    const [time, setTime] = useState(leftTime);

    useEffect(()=>{
        if(time >= 1000){
            setTimeout(()=>{
                setTime(prev=>prev-1000);
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time/60000)} : {two(parseInt(time/1000) - 60 * parseInt(time/60000))}</div>
}

const TimeSlot9 = ({leftTime}) => {
    const [time, setTime] = useState(leftTime);

    useEffect(()=>{
        if(time >= 1000){
            setTimeout(()=>{
                setTime(prev=>prev-1000);
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time/60000)} : {two(parseInt(time/1000) - 60 * parseInt(time/60000))}</div>
}


export {TimeSlot1, TimeSlot2, TimeSlot3, TimeSlot4, TimeSlot5, TimeSlot6, TimeSlot7, TimeSlot8, TimeSlot9};