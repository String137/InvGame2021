import React, { useEffect, useState } from 'react';
import './index.css';
import * as TIME from '../../constants/time';

const times = [
    0,
    TIME.ACC_ROUND1_VIDEO_OFFSET,
    TIME.ACC_ROUND1_INVEST_OFFSET,
    TIME.ACC_ROUND2_VIDEO_OFFSET,
    TIME.ACC_ROUND2_INVEST_OFFSET,
    TIME.ACC_ROUND3_VIDEO_OFFSET,
    TIME.ACC_ROUND3_INVEST_OFFSET,
    TIME.ACC_FINAL_VIDEO_OFFSET,
    TIME.ACC_FINAL_INVEST_OFFSET,
    TIME.ACC_FINAL_REDIRECTION_OFFSET
];
function two(num) {
    if (num < 10) {
        return "0" + num;
    }
    else {
        return num;
    }
}
const TimeSlot1 = ({ leftTime }) => {
    const [time, setTime] = useState(leftTime);

    useEffect(() => {
        if (time >= 1000) {
            setTimeout(() => {
                setTime(TIME.START_TIME+times[0]-new Date().getTime());
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time / 60000)} : {two(parseInt(time / 1000) - 60 * parseInt(time / 60000))}</div>
}

const TimeSlot2 = ({ leftTime }) => {
    const [time, setTime] = useState(leftTime);

    useEffect(() => {
        if (time >= 1000) {
            setTimeout(() => {
                setTime(TIME.START_TIME+times[1]-new Date().getTime());
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time / 60000)} : {two(parseInt(time / 1000) - 60 * parseInt(time / 60000))}</div>
}

const TimeSlot3 = ({ leftTime }) => {
    const [time, setTime] = useState(leftTime);

    useEffect(() => {
        if (time >= 1000) {
            setTimeout(() => {
                setTime(TIME.START_TIME+times[2]-new Date().getTime());
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time / 60000)} : {two(parseInt(time / 1000) - 60 * parseInt(time / 60000))}</div>
}

const TimeSlot4 = ({ leftTime }) => {
    const [time, setTime] = useState(leftTime);

    useEffect(() => {
        if (time >= 1000) {
            setTimeout(() => {
                setTime(TIME.START_TIME+times[3]-new Date().getTime());
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time / 60000)} : {two(parseInt(time / 1000) - 60 * parseInt(time / 60000))}</div>
}

const TimeSlot5 = ({ leftTime }) => {
    const [time, setTime] = useState(leftTime);

    useEffect(() => {
        if (time >= 1000) {
            setTimeout(() => {
                setTime(TIME.START_TIME+times[4]-new Date().getTime());
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time / 60000)} : {two(parseInt(time / 1000) - 60 * parseInt(time / 60000))}</div>
}

const TimeSlot6 = ({ leftTime }) => {
    const [time, setTime] = useState(leftTime);

    useEffect(() => {
        if (time >= 1000) {
            setTimeout(() => {
                setTime(TIME.START_TIME+times[5]-new Date().getTime());
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time / 60000)} : {two(parseInt(time / 1000) - 60 * parseInt(time / 60000))}</div>
}

const TimeSlot7 = ({ leftTime }) => {
    const [time, setTime] = useState(leftTime);

    useEffect(() => {
        if (time >= 1000) {
            setTimeout(() => {
                setTime(TIME.START_TIME+times[6]-new Date().getTime());
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time / 60000)} : {two(parseInt(time / 1000) - 60 * parseInt(time / 60000))}</div>
}
const TimeSlot8 = ({ leftTime }) => {
    const [time, setTime] = useState(leftTime);

    useEffect(() => {
        if (time >= 1000) {
            setTimeout(() => {
                setTime(TIME.START_TIME+times[7]-new Date().getTime());
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time / 60000)} : {two(parseInt(time / 1000) - 60 * parseInt(time / 60000))}</div>
}

const TimeSlot9 = ({ leftTime }) => {
    const [time, setTime] = useState(leftTime);

    useEffect(() => {
        if (time >= 1000) {
            setTimeout(() => {
                setTime(TIME.START_TIME+times[8]-new Date().getTime());
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time / 60000)} : {two(parseInt(time / 1000) - 60 * parseInt(time / 60000))}</div>
}

const TimeSlot10 = ({ leftTime }) => {
    const [time, setTime] = useState(leftTime);

    useEffect(() => {
        if (time >= 1000) {
            setTimeout(() => {
                setTime(TIME.START_TIME+times[9]-new Date().getTime());
            }, 1000);
        }
    }, [time]);
    return <div className="time-left">{parseInt(time / 60000)} : {two(parseInt(time / 1000) - 60 * parseInt(time / 60000))}</div>
}

export { TimeSlot1, TimeSlot2, TimeSlot3, TimeSlot4, TimeSlot5, TimeSlot6, TimeSlot7, TimeSlot8, TimeSlot9, TimeSlot10 };