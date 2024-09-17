import { useEffect, useState } from "react";

function HandleWaitList() {
	const [email, setEmail] = useState("");
	const [buttonText, setButtonText] = useState("Get Started");
	const [message, setMessage] = useState("");
    const [isSuccessful, setIsSuccessful] = useState(null);

    // const [showMessage, setShowMessage] = useState(false);

	useEffect(() => {
		let timer;
		if (message) {
            // setMessage("");
			// setIsSuccessful(true);
			// Hide the message after 5 seconds
			timer = setTimeout(() => {
                setMessage(""); // Clear the message after timeout
				setIsSuccessful(false); // Reset success state after hiding the message
			}, 5000); // Adjust the timeout duration as needed
		}
		// Cleanup the timer on component unmount or if message changes
		return () => clearTimeout(timer);
	}, [message]);
	// const [req, setReq] = useState(false);

	const emailHandler = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
		// console.log(setEmail);
	};

	const submitHandler = async () => {
		try {
			setButtonText("Registering...");
			if (email === "") {
				setButtonText("Get Started");
				setMessage("Email is Required");
                setIsSuccessful(false);
                return;
			}

			const data = { email };
			const url = "https://visibuy-backend.onrender.com/api/beta";

			const req = await fetch(url, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

            if (req.status === 200) {
                window.gtag("event", "sign_up", {
                    event_category: "User",
                    event_label: "Sign Up",
                    value: 1, // Optional: Set a value if applicable
                });

                // window.fbq('track', 'CompleteRegistration', {
                // content_name: 'Sign Up',
                // content_category: 'User Actions',
                // email: email,
                // });
                setButtonText("Get Started");
                // setReq(true);
                setEmail("");
                setMessage("Thank you for joining the waitlist. You're part of the top list of people to know when we launch🥂");
                setIsSuccessful(true);
            } else {
                setButtonText("Get Started");
                setMessage("Something Went Wrong. Try again.");
                setIsSuccessful(false);
            }
		} catch (error) {
			setButtonText("Get Started");
            // setFeedback(false);
			console.log(error);
			setMessage("Something Went Wrong. Try again.");
            setIsSuccessful(false);
		}
	};
	return { email, emailHandler, submitHandler, buttonText, message, isSuccessful };
	// <WaitList email={email}
	//     emailHandler={emailHandler}
	//     submitHandler={submitHandler}
	//     buttonText={buttonText}
	// />
}

export default HandleWaitList;
