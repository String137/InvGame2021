import React from 'react';
import { withFirebase } from '../../Firebase';


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
        console.log("companies", companiesObject);
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

    render() {
        const { companies, loading } = this.state;

        return (
        <div>
            <h1>Admin</h1>

            {loading && <div>Loading ...</div>}

            <CompanyList companies={companies} />
            <button onClick={function(){console.log("hi")}}>SET START TIME</button>
        </div>
        );
    }
}

const CompanyList = ({ companies }) => (
<ul>
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