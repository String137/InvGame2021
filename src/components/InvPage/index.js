import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
import CompanyPage from './CompanyPage';
import './index.css';


const InvPageBase = ({ round, firebase, history, count }) => {
    const [curms, setCurms] = useState([]);
    const [aftms, setAftms] = useState([]);
    const [names, setNames] = useState([]);
    const [asset, setAsset] = useState(0);
    const [inputs, setInputs] = useState([]);
    const [inputsum, setInputsum] = useState(0);
    const [invDone, setInvDone] = useState(false);
    const [invDoneCheck, setInvDoneCheck] = useState(true);
    const [check, setCheck] = useState(false);
    const [rankedList, setRankedList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    var fb = firebase;




    fb.auth.onAuthStateChanged((user) => {
        if (user) {
            setLoaded(true);
        }
        else {
            setLoaded(false);
        }
    })
    useEffect(() => {
        // document.addEventListener('keypress',function(){setInputsum(inputs.reduce((a, b) => a+b, 0))});
        if (fb.auth.currentUser) {
            var uid = fb.auth.currentUser.uid;

            async function getAsset() {
                const snapshot = await fb.db.ref(`/users/${uid}/asset/`).once('value');
                const asset = snapshot.val();
                setAsset(asset);
            }

            async function getNames() {
                const snapshot = await fb.db.ref(`/companies/`).once('value');
                const value_list = snapshot.val().map(e => e.companyname);
                if (names !== value_list) {
                    setNames(value_list);
                }
                return snapshot;
            }
            async function getCurms() {
                const snapshot = await fb.db.ref('/users/' + uid + `/invest/`).once('value');
                const value_list = Object.values(snapshot.val()).map(e => e.curm);
                if (curms !== value_list) {
                    setCurms(value_list);
                }
                return snapshot;
            }
            async function getAftms() {
                const snapshot = await fb.db.ref('/users/' + uid + `/invest/`).once('value');
                const value_list = Object.values(snapshot.val()).map(e => e.aftm);
                if (aftms !== value_list) {
                    setAftms(value_list);
                }
                return snapshot;
            }
            async function getRank() {
                var updates = {};
                //updates['/equal1']=false;
                //updates['/round1submitted']=0;
                const snapshot = await fb.db.ref('/companies/').once('value');
                const objs = snapshot.val();
                const companyRankList = objs.sort((a, b) => a[`stock`] < b[`stock`] ? 1 : -1);
                return companyRankList.map(res => res['index']);
            }



            getRank().then(res => {
                if (rankedList !== res) {
                    setRankedList(res);
                };
            });

            getAsset();
            // setInputsum(inputs.reduce((a, b) => a+b, 0));

            if (invDoneCheck) {
                getNames();
                getCurms();
                getAftms();
                setInvDoneCheck(false);
            }
            if (invDone) {
                setInvDone(false);
            }
            if (check) {

                // setInputsum(inputs.reduce((a, b) => a+b, 0));
                // console.log(inputsum);
                alert(`니 자산: ${asset - inputs.reduce((a, b) => a + b, 0)}`);
                setCheck(false);
            }
            if (inputs.reduce((a, b) => a + b, 0) > asset) {
                document.querySelector(".invest_done").checked = false;
            }
        }
        else {
            setLoaded(false);
        }





        // alert(`니 자산: ${asset-inputsum}`);
    }, [aftms, asset, curms, inputs, invDone, invDoneCheck, names, inputsum, check, loaded]);

    // setInputsum(inputs.reduce((a, b) => a+b, 0));
    async function complete({ target: { checked } }) {
        //CompanyPage.aftm
        setInvDone(true);
        setInvDoneCheck(true);
        var input = inputs.reduce((a, b) => a + b, 0);
        var updates = {};
        if (asset >= input && checked) {
            updates[`/users/${fb.auth.currentUser.uid}/invest/input`] = input;
        }
        else {
            const snapshot = await fb.db.ref(`/users/${fb.auth.currentUser.uid}/invest/`).once('value');
            const curms = Object.values(snapshot.val()).map(e => e.curm);
            for (var i = 0; i < 9; i++) {
                updates[`/users/${fb.auth.currentUser.uid}/invest/company${i}/aftm`] = curms[i];
            }
        }
        fb.db.ref().update(updates);
    }

    function getInput(data, index, radix) {
        var list = inputs;
        var update = 0;
        if (radix === 0) {   /* 투자 */
            update = data;
        }
        else if (radix === 1) {  /* 철회 */
            if (round < 4) {
                update = - parseInt(data * (1 - assets.ROUND1_FEE_RATIO));
            }
            else {
                update = - parseInt(data * (1 - assets.FINAL_FEE_RATIO));

            }
        }
        else {
            update = 0;
        }
        list[index] = update;
        setInputs(list);
    }

    return (
        <>
            <div className="inv-page-container">
                <div className="left-header-container">
                    <div className="left-header">
                        Round {round}
                        <h2>${asset}</h2>
                        <div>
                            <label>
                                <div className="check-asset">투자 후 자산 확인하기</div>
                                <button className="button" onClick={function () { setCheck(true); }}></button>
                            </label>
                            <label>
                                <div className="invest-done-container">
                                    <input type="checkbox" className="invest-done" onClick={complete} />
                                    <div className="invest-done-text">투자</div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="inv-page">
                    {!setLoaded ? <div>"Loading..."</div> : <>
                        {rankedList.slice(0, count).map(i => <div className={`comp${rankedList[i]}`}><CompanyPage key={i} calc={getInput} name={names[i]} curm={curms[i]} invDone={invDone} aftm={aftms[i]} index={i} /></div>)}</>}
                </div>
            </div>
        </>


    );

}
const InvPage = withRouter(withFirebase(InvPageBase));
export default InvPage;