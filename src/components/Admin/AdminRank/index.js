import React from 'react';
import { withFirebase } from '../../Firebase';
import './index.css';

class AdminRank extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            onlineusers: [],
            blendusers: [],
            companies: [],
        };
    }

    componentDidMount() {
        this.setState({ user: this.props.firebase.auth.currentUser });
        this.props.firebase.db.ref('/users').once('value').then(
            (snapshot) => {
                var online = [];
                var blend = [];
                for (const [key, value] of Object.entries(snapshot.val())) {
                    if (value["online"]) {
                        online.push({ uid: key, username: value["username"], asset: value["asset"] });
                    }
                    else {
                        blend.push({ uid: key, username: value["username"], asset: value["asset"] });
                    }

                }
                online.sort((a, b) => a['asset'] > b['asset'] ? -1 : 1);
                blend.sort((a, b) => a['asset'] > b['asset'] ? -1 : 1);

                this.setState({ onlineusers: online, blendusers: blend });
            }
        );
        this.props.firebase.db.ref('/companies').once('value').then(
            (snapshot) => {
                var round2ranklist = snapshot.val().map(e => e.round2rank);
                var round3ranklist = snapshot.val().map(e => e.round3rank);
                var finalranklist = snapshot.val().map(e => e.finalrank);
                var realranklist = snapshot.val().map(e => e.realrank);
                var round2ordered = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                var round3ordered = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                var finalordered = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                var realordered = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                var checked = [false, false, false, false, false, false, false, false, false];
                for (let i = 0; i < 9; i++) {
                    round2ordered[round2ranklist[i] - 1] = i;
                    round3ordered[round3ranklist[i] - 1] = i;
                    finalordered[finalranklist[i] - 1] = i;
                }
                for (let i = 0; i < 3; i++) {
                    realordered[i] = finalordered[i];
                    checked[finalordered[i]] = true;
                }
                let j = 3;
                let i = 0;
                while (j < 5) {
                    if (!checked[round3ordered[i]]) {
                        realordered[j] = round3ordered[i];
                        checked[round3ordered[i]] = true;
                        j++;
                    }
                    else {
                        i++;
                    }
                }
                let k = 5;
                let l = 0;
                while (k < 9) {
                    if (!checked[round2ordered[l]]) {
                        realordered[k] = round2ordered[l];
                        checked[round2ordered[l]] = true;
                        k++;
                    }
                    else {
                        l++;
                    }
                }
                for (let i = 0; i < 9; i++) {
                    realranklist[realordered[i]] = i + 1;
                }
                for (let i = 0; i < 9; i++) {
                    this.props.firebase.db.ref(`/companies/${i}`).update({ realrank: realranklist[i] });
                }
                this.props.firebase.db.ref('/companies').once('value').then((snapshot) => {
                    const objs = snapshot.val();
                    const companyRankList = Object.values(objs).sort((a, b) => a[`realrank`] > b[`realrank`] ? 1 : -1);
                    this.setState({ companies: companyRankList });
                })
            }

        );

    }
    componentWillUnmount() {

    }
    componentDidUpdate() {
        if (this.state.user !== this.props.firebase.auth.currentUser) {
            this.setState({ user: this.props.firebase.auth.currentUser });
        }
    }

    render() {
        if (this.state.user === null) {
            return <div className="nouser">No user</div>;
        }
        else if (this.state.user.email !== "icists@icists.org") {
            return <div className="noauth">No auth</div>;
        }
        return (
            <div className="final-rank-page-container">
                <div className="rank-left-header-container">
                    <div className="rank-left-header-text">
                        Finished
                </div>
                </div>
                <div className="final-rank-container">
                    <h1 className="final-rank-text">결과발표!</h1>
                    <hr />
                    <div className="final-rank-header">
                        참가자 순위
                </div>
                    <div className="final-user-ranko">
                        {this.state.onlineusers.slice(0, 10).map(res => <div>{"🙋"}{res["username"]}: {putcommas(res["asset"])}원</div>)}
                    </div>
                    <div className="final-user-rankb">
                        {this.state.blendusers.slice(0, 10).map(res => <div>{"👨‍👦‍👦"}{res["username"]}: {putcommas(res["asset"])}원</div>)}
                    </div>
                    <div className="final-rank-header">
                        스타트업 순위
                </div>
                    <div className="final-company-rank">
                        {this.state.companies.map(res => <div> {res["realrank"]}. {res["companyname"]}</div>)}
                    </div>
                </div>
            </div>
        );
    }
}
function three(num) {
    if (num < 10) {
        return "00" + num;
    }
    else if (num < 100) {
        return "0" + num;
    }
    else return num;
}
function putcommas(num) {
    var res = "";
    while (num > 0) {
        if (num >= 1000) {
            res = "," + three(num % 1000) + res;
        }
        else {
            res = num % 1000 + res;
        }
        num = parseInt(num / 1000);
    }
    return res;
}


export default withFirebase(AdminRank);