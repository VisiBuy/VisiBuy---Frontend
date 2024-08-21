import React, { useState } from "react";

import WaitList from "../StatelessComponent/waitList";

function WaitListComp () {
    const [email, setEmail] = useState('');
    const [buttonText, setButtonText] = useState('Sign Up');

    const emailHandler = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const submitHandler = async () => {
        try {
            setButtonText('Signing...');
            if (email === '') {
                setButtonText('Sign Up');
                return alert('Email is Required')
            };
    
            const data = { email };
            const url = 'https://visibuy-backend.onrender.com/api/beta';
    
            const req = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
    
            if (req.status === 200) {
                window.gtag('event', 'sign_up', {
                    event_category: 'User',
                    event_label: 'Sign Up',
                    value: 1, // Optional: Set a value if applicable
                });

                window.fbq('track', 'CompleteRegistration', {
                content_name: 'Sign Up',
                content_category: 'User Actions',
                email: email,
                });
                setButtonText('Sign Up');
                return alert('Thank you for Signing Up');
            };
            setButtonText('Sign Up');
            return alert('Something Went Wrong. Try again.');
        } catch (error) {
            setButtonText('Sign Up');
            console.log(error);
            return alert('Something Went Wrong. Try again.');
        }
    };
    return (
        <WaitList email={email}
            emailHandler={emailHandler}
            submitHandler={submitHandler}
            buttonText={buttonText}
        />
    );
};

export default WaitListComp;