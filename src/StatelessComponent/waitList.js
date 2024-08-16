import React from 'react';

import '../StyleSheets/waitList.css';
import logo from '../Images/VisiBuy - Colored.png'

function WaitList () {
    return (
        <div>
            <div className='header-container'>
                <div className='logo-div'>
                    <img src={logo} alt='VisiBuy_Logo' className='logo'/>
                </div>
                {/* <div className='menu'>Menu</div> */}
            </div>
            <div className='beta-container'>
                <div className='beta-button'>
                    <button className='bbb'>Beta</button>
                </div>
                <div className='beta-text'>
                    <p style={{ marginLeft: '-6px', fontSize: '11px', fontWeight: '400' }}>Shop With Certainty!</p>
                </div>
            </div>
            <div className='wis'>
                <div>
                    <h1 className='wis-h'>What You See Is What You Get</h1>
                </div>
            </div>
            <div className='p-div'>
                <p className='p-text'>Visual Proof for Every Order: Ensuring You Get Exactly What You Ordered. Join Our Beta Program and Experience the Future of Online Shopping.</p>
            </div>
            <div className='email-section-beta'>
                <div className='input-section'>
                    <div>
                        <input style={{border: 'none', padding: '10px', background: '#E3E3E3', fontSize: '18px'}} placeholder='Enter Email Address'/>
                    </div>
                    <div>
                        <button style={{border: 'none', padding: '10px', color: 'white', background: '#28A745', fontWeight: '400', borderRadius: '7px'}}>Sign Up</button>
                    </div>
                </div>
                <p style={{textAlign: 'center', fontSize: '11px', padding: '0 56px'}}>PS: Join our beta program and be the first to know when we officially launch🎉.</p>
            </div>
        </div>
    );
};

export default WaitList;