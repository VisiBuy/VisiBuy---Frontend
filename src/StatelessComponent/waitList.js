import React from 'react';

import '../StyleSheets/waitList.css'

function WaitList () {
    return (
        <div>
            <div className='header-container'>
                <div className='logo'>Logo</div>
                <div className='menu'>Menu</div>
            </div>
            <div className='beta-container'>
                <div className='beta-button'>
                    <button className='bbb'>Beta</button>
                </div>
                <div className='beta-text'>
                    <p style={{ marginLeft: '16px' }}>Shop With Certainty</p>
                </div>
            </div>
            <div className='wis'>
                <div>
                    <h1 className='wis-h'>What You See Is What You Get</h1>
                </div>
            </div>
        </div>
    );
};

export default WaitList;