import React, { useState } from "react";

import WaitList from "../StatelessComponent/waitList";

function WaitListComp () {
    const [email, setEmail] = useState('');

    const emailHandler = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const submitHandler = async () => {
        try {
            if (email === '') {
                return alert('Email is Required')
            };
    
            const data = { email };
            const url = 'localhost:5000/api/waitlist';
    
            const req = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
    
            if (req.status === 200) {
                return alert('Thank you for Signing Up to our Beta Program');
            };
    
            return alert('Something Went Wrong. Try again later');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <WaitList email={email}
            emailHandler={emailHandler}
            submitHandler={submitHandler}
        />
    );
};

export default WaitListComp;