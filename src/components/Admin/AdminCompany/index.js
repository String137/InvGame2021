import React from 'react';
import { withFirebase } from '../../Firebase';
import './index.css';

class AdminCompany extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        loading: false,
        companies: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.db.ref('/companies').once('value').then(snapshot => {
        const companiesObject = snapshot.val();
        if(companiesObject){
            const companiesList = Object.keys(companiesObject).map(key => ({
            ...companiesObject[key],
            index: key,
        }));

        this.setState({
            companies: companiesList,
            loading: false,
        });
        }
        });
    }

    componentWillUnmount() {
        this.setState({
            loading: true,
        });
    }

    resetInfo = () => {
        console.log(this.state.companies);
        this.state.companies.map(company => this.props.firebase.db.ref(`/companies/${company.index}`).update(
            {
                stock: 0,
                round1rank: parseInt(company["index"]) + 1,
                round2rank: parseInt(company["index"]) + 1,
                round3rank: parseInt(company["index"]) + 1,
                finalrank: parseInt(company["index"]) + 1,
            }
        ));

        alert('reset!');
        this.setState({ loading: true });
    
        this.props.firebase.db.ref('/users').once('value').then(snapshot => {
          const usersObject = snapshot.val();
          if(usersObject){
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
        this.setState({ loading: true });

        this.props.firebase.db.ref('/companies').once('value').then(snapshot => {
        const companiesObject = snapshot.val();
        if(companiesObject){
            const companiesList = Object.keys(companiesObject).map(key => ({
            ...companiesObject[key],
            index: key,
        }));

        this.setState({
            companies: companiesList,
            loading: false,
        });
        }
        });
      }

    render() {
        const { companies, loading } = this.state;

        return (
        <div className="render">
            <h1>Admin</h1>

            {loading && <div>Loading ...</div>}

            <CompanyList companies={companies} />
            <button onClick={this.resetInfo}>SET START TIME</button>
        </div>
        );
    }
}

const CompanyList = ({ companies }) => (
<ul className="cp">
    {companies.map(company => (
    <li key={company.index}>
        <span>
        <strong>Company name:</strong> {company.companyname} <br/>
        </span>
        <span>
        <strong>Stock:</strong> {company.stock} <br/>
        </span>
    </li>
    ))}
</ul>
);

export default withFirebase(AdminCompany);