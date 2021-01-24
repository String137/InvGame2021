import React from 'react';

const Company = ({ name }) => {
    if (name) {
        return (
            <div>
                {name}
            </div>
        );
    }
    else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}

export default Company;