import React from 'react';

const AfterInv = ({money}) => {
    if(!isNaN(money)){
        return (
            <div>
                {money}
            </div>
        );
    }
    else{
        return (
            <div>
                Loading...
            </div>
        );
    }
}

export default AfterInv;