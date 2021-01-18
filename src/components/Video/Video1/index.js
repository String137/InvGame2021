import React, {useState, useEffect} from 'react';
import * as assets from '../../../constants/money';
import { withAuthorization } from '../../Session';
import { SignUpForm } from '../../SignUp';
import Images1 from '../../Images';
import { withFirebase } from "../../Firebase";
import { Link, withRouter } from 'react-router-dom';
import './index.css';

///////

const Thumbnail = ({companyName}) => {
    const [selected, setSelected] = useState(false);
    
    var color="white";
    const companySelected = ({target: input}) => {
    var checkedNum = 0;
    var checkedList = Array.from(document.querySelectorAll("input")).map(res=>res.checked);
      for(var i = 0; i<checkedList.length; i++){
        if(checkedList[i]){
          checkedNum += 1;  
        }
      }
      if(checkedNum > 6){
        input.checked = !input.checked;
      }
      setSelected(input.checked);
    }
    if(selected){
      color = "lightgray";
    }
    
   
    useEffect(()=>{
      document.getElementById(companyName).style.backgroundColor = color;
    }, [selected]);
    return(
    <>
    <label className="logo" id={companyName}>
      {companyName}
       <input type="checkbox" className="companyCheckbox" onClick={companySelected} />
    </label>
    </>);
  }
  
  const SelectButton = () => {
    return(
    <>
      <button className="selectButton">Select</button>
    </>
    )
  }
  
  const CompanyContainer = () => {
    const companyList = [1, 2, 3, 4, 5, 6, 7, 8];
  
    return(
        <>
          <Thumbnail companyName={"Company"+companyList[0]}/>
          <Thumbnail companyName={"Company"+companyList[1]}/>
          <Thumbnail companyName={"Company"+companyList[2]}/>
          <Thumbnail companyName={"Company"+companyList[3]}/>
          <SelectButton />
          <Thumbnail companyName={"Company"+companyList[4]}/>
          <Thumbnail companyName={"Company"+companyList[5]}/>
          <Thumbnail companyName={"Company"+companyList[6]}/>
          <Thumbnail companyName={"Company"+companyList[7]}/>
        </>
      
    );
  }
  
const Video1 = () => {
    return <div className="logo_container">
        <CompanyContainer/>
    </div>
} 

export default Video1;