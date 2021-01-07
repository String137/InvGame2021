import React, { Component } from 'react';


class Time extends Component {

    constructor(props){
        super(props);
        this.state = {
            START_TIME: 0,
        }
    }

    date = 0;

    componentDidMount(){
        this.setState({
            START_TIME: this.date,
        });
    }
    setStartTime(){
        this.setStartTimes(0);
    }
    setStartTimes(opt) {
        console.log("hi");
        if(opt===0){
            console.log("hey");
            this.date = Date.now();
        }
        else if(opt===1){
            this.date = new Date(21,1,1,2,0,0).getTime();
        }
        
        console.log(this.state.START_TIME);
    }
}
const time = new Time();

export default time;