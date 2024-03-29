import React, { Component } from 'react';
// import Time from '../../constants/time'
import { withFirebase } from '../Firebase';
import * as assets from '../../constants/money';
import './index.css';
class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      users: [],
      companies: [],
      curList: [],
      round: 0,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.setState({ user: this.props.firebase.auth.currentUser });
    this.props.firebase.db.ref('/users').once('value').then(snapshot => {
      const usersObject = snapshot.val();
      if (usersObject) {
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));
        this.setState({
          users: usersList,
          loading: false,
        });
      }
    });
    this.props.firebase.db.ref('/companies').once('value').then(snapshot => {
      const cObject = snapshot.val();
      if (cObject) {
        const companyList = Object.keys(cObject).map(key => ({
          name: cObject[key].companyname,
          rank: cObject[key].finalrank,
        }));
        this.setState({
          companies: companyList,
        });
      }
    });
  }

  componentWillUnmount() {
    this.setState({
      loading: true,
    });
  }
  componentDidUpdate() {
    if (this.state.user !== this.props.firebase.auth.currentUser) {
      this.setState({ user: this.props.firebase.auth.currentUser });
    }
  }
  setequal1 = () => {
    var updates = {};
    updates['/equal1'] = true;
    this.props.firebase.db.ref().update(updates);
  }
  setequal2 = () => {
    var updates = {};
    updates['/equal2'] = true;
    this.props.firebase.db.ref().update(updates);
  }
  setequal3 = () => {
    var updates = {};
    updates['/equal3'] = true;
    this.props.firebase.db.ref().update(updates);
  }
  setequalf = () => {
    var updates = {};
    updates['/equalf'] = true;
    this.props.firebase.db.ref().update(updates);
  }
  resetInfo = () => {
    var updates = {};
    updates['/equal1'] = false;
    updates['/equal2'] = false;
    updates['/equal3'] = false;
    updates['/equalf'] = false;
    updates['/round1submitted'] = 0;
    updates['/round2submitted'] = 0;
    updates['/round3submitted'] = 0;
    updates['/finalsubmitted'] = 0;
    updates['/finRound'] = 0;

    this.props.firebase.db.ref().update(updates)
    this.state.users.map(user => this.props.firebase.user(user.uid).update({
      asset: assets.INITIAL_ASSET,
      reward: 0,
      round1submitted: 0,
      round1getsubmit: false,
      round2submitted: 0,
      round2getsubmit: false,
      round3submitted: 0,
      round3getsubmit: false,
      finalsubmitted: 0,
      finalgetsubmit: false,
      invest: {
        company0: {
          curm: 0,
          aftm: 0,
        },
        company1: {
          curm: 0,
          aftm: 0,
        },
        company2: {
          curm: 0,
          aftm: 0,
        },
        company3: {
          curm: 0,
          aftm: 0,
        },
        company4: {
          curm: 0,
          aftm: 0,
        },
        company5: {
          curm: 0,
          aftm: 0,
        },
        company6: {
          curm: 0,
          aftm: 0,
        },
        company7: {
          curm: 0,
          aftm: 0,
        },
        company8: {
          curm: 0,
          aftm: 0,
        }
        , input: 0,
      }
    }));
    alert('reset!');
    this.setState({ loading: true });

    this.props.firebase.db.ref('/users').once('value').then(snapshot => {
      const usersObject = snapshot.val();
      if (usersObject) {
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));

        this.setState({
          users: usersList,
          loading: false,
        });
      }
    });
  }
  getRankn(n) {
    const { companies } = this.state;

    if (companies[8] != null) {
      var a = 0;
      // return companies[n];
      for (var i = 0; i < 9; i++) {
        if (n === companies[i].rank) {
          a = i;
        }
      }
      return companies[a].name;
      // return "hmm";
    }
    else {
      return "Wait...";
    }
  }

  setRound = async () => {
    const snapshot = await this.props.firebase.db.ref('/finRound').once('value');
    var round = snapshot.val();
    if (round === 0) {
      const snap = await this.props.firebase.db.ref('equal1').once('value');
      if (snap.val() === true) {
        this.props.firebase.db.ref('/').update({ finRound: 1 });
      }
    }
    if (round === 1) {
      const snap = await this.props.firebase.db.ref('equal2').once('value');
      if (snap.val() === true) {
        this.props.firebase.db.ref('/').update({ finRound: 2 });
      }
    }
    if (round === 2) {
      const snap = await this.props.firebase.db.ref('equal3').once('value');
      if (snap.val() === true) {
        this.props.firebase.db.ref('/').update({ finRound: 3 });
      }
    }
    if (round === 3) {
      const snap = await this.props.firebase.db.ref('equalf').once('value');
      if (snap.val() === true) {
        this.props.firebase.db.ref('/').update({ finRound: 4 });
        clearInterval(this.aa);
      }
    }
  }
  getWinner = async () => {
    // return "1";
    const snapshot = await this.props.firebase.db.ref('/finRound').once('value');
    const round = snapshot.val();
    if (round === 0) {
      return 1;
    }
    else if (round === 1) {
      const snap = await this.props.firebase.db.ref('/companies/').once('value');
      const list = snap.val().map(e => ({ rank: e.round1rank, index: e.index, name: e.companyname }));
      list.sort(function (a, b) {
        if (a.rank > b.rank) {
          return 1;
        }
        else {
          return -1;
        }
      });
      this.setState({ curList: list });
      this.setState({ round: 1 });
      return list;
    }
    else if (round === 2) {
      const snap = await this.props.firebase.db.ref('/companies/').once('value');
      const list = snap.val().map(e => ({ rank: e.round2rank, index: e.index, name: e.companyname }));
      list.sort(function (a, b) {
        if (a.rank > b.rank) {
          return 1;
        }
        else {
          return -1;
        }
      });
      this.setState({ curList: list.slice(0, 5) });
      this.setState({ round: 2 });
      return list;
    }
    else if (round === 3) {
      const snap = await this.props.firebase.db.ref('/companies/').once('value');
      const list = snap.val().map(e => ({ rank: e.round3rank, index: e.index, name: e.companyname }));
      list.sort(function (a, b) {
        if (a.rank > b.rank) {
          return 1;
        }
        else {
          return -1;
        }
      });
      this.setState({ curList: list.slice(0, 3) });
      this.setState({ round: 3 });
      return list;
    }
    else if (round === 4) {
      const snap = await this.props.firebase.db.ref('/companies/').once('value');
      const list = snap.val().map(e => ({ rank: e.finalrank, index: e.index, name: e.companyname }));
      list.sort(function (a, b) {
        if (a.rank > b.rank) {
          return 1;
        }
        else {
          return -1;
        }
      });
      this.setState({ curList: list.slice(0, 3) });
      this.setState({ round: 4 });
      return list;
    }

  }

  aa = setInterval(this.setRound, 1000);
  bb = setInterval(this.getWinner, 1000);

  render() {
    const { users, loading } = this.state;
    // this.setRound();
    if (this.state.user === null) {
      return <div className="nouser">No user</div>;
    }
    else if (this.state.user.email !== "icists@icists.org") {
      return <div className="noauth">No auth</div>;
    }
    return (
      <div className="render">
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}
        <button onClick={this.setequal1}>Equal1</button>
        <button onClick={this.setequal2}>Equal2</button>
        <button onClick={this.setequal3}>Equal3</button>
        <button onClick={this.setequalf}>Equalf</button>
        <h1>1st {this.getRankn(1)}</h1>
        <h1>2nd {this.getRankn(2)}</h1>
        <h1>3rd {this.getRankn(3)}</h1>
        <div id="passlist">
          Round {this.state.round} {this.state.curList.map(e => <div>{e.rank}. {e.name}</div>)}
        </div>
        <button onClick={function () {
          var copyText = "";
          for (let i = 0; i < document.getElementById('passlist').children.length; i++) {
            copyText = copyText + document.getElementById('passlist').children[i].innerHTML;
            copyText = copyText + "\n";
          }
          const temp = document.createElement('textarea');
          temp.value = copyText;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('Copy');
          document.body.removeChild(temp);
          alert('복사되었습니다, 감사합니다.');
        }}>복사하기</button>
        <button className="reset-button" onClick={this.resetInfo}>RESET Users INFO</button>
        <UserList users={users} />
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
  if (num === 0) {
    return 0;
  }
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



const UserListBase = ({ users, firebase }) => {
  var count = 0;
  users.forEach((user) => {
    count += user['loggedin'] ? 1 : 0;
  })
  if(count!==0){
  firebase.db.ref('/').update({ loggedinUser: count });
  }


  return (
    <>
      <ul className="ul">
        <h2>
          로그인 한 사람 수 : {count}
        </h2>
        {users.map(user => (
          <li key={user.uid}>
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Asset:</strong>{putcommas(user.asset)}원
            </div>
            <div>
              <strong>Invest</strong><ol>{Object.values(user['invest']).slice(0, -1).map(company => <li>[curm: {company.curm}, aftm: {company.aftm}]</li>)}<li>Input : {user['invest']['input']}</li></ol>
            </div>
            <div>
              <strong>LoggedIn:</strong>{user.loggedin.toString()}
            </div>
            <br />
          </li>
        ))}
      </ul>
    </>);
};
const UserList = withFirebase(UserListBase);
export default withFirebase(AdminPage);