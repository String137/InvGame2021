import React, { Component } from 'react';

const CurInv = ({ money }) => {
    if (money != null) {
        return (
            <div>
                {money}
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

export default CurInv;