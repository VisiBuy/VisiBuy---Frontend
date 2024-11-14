// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './test.css';
import visibuyLogo from '../../assets/logo11.png';  
import lockIcon from '../../assets/lock.png';
import Notification from '../../Notification'; 
import { register } from '../../services/authServices';

const Register = () => {
  const [fn, setFirstname] = useState('');
  const [ln, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');       
  const [phoneNumberRaw, setPhoneNumberRaw] = useState('');  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     setError("Passwords do not match.");
  //     return;
  //   }
  //   if (!termsAccepted) {
  //     setError("You must accept the terms and conditions.");
  //     return;
  //   }
  //   setLoading(true);
  //   // setError(null);
  //   // setStatusCode(null);
  //   try {
  //     const result = await register(fn, ln, email, password, address, phoneNumberRaw); 
  //     // Handle registration success (e.g., redirect to login)
  //     console.log('Registration successful:', result);
  //     // setError(`Registration successful: ${JSON.stringify(result)}`);
  //     setLoading(false);
  //     navigate('/#/login'); 
  //   } catch (error) {
  //     setError(error.response?.data?.detail || 'Registration failed. Please try again.');
  //     setLoading(false);
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }
    setLoading(true);
    setError(null);  // Clear previous errors before attempting registration
  
    try {
      const result = await register(fn, ln, email, password, address, phoneNumberRaw);
      setLoading(false);
      navigate('/#/login'); // Redirect to login page on successful registration
    } catch (error) {
      const errorMessage = error.msg || 'Registration failed. Please try again.';
      // setError(errorMessage);
      setError(errorMessage);
      setNotification({ message: errorMessage, type: 'error' });
      setLoading(false); // Ensure loading is reset in case of an error
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handlePhoneNumberChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    setPhoneNumberRaw(input);      
    if (input.length > 3 && input.length <= 7) {
      input = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else if (input.length > 7) {
      input = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
    }
    setPhoneNumber(input);                         
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={visibuyLogo} alt="VisiBuy Logo" className="sidebar-logo" />
        <div className="login-text">
          <img src={lockIcon} alt="Lock Icon" className="lock-icon" />
          <span>Sign Up</span>
        </div>
      </div>
      <div className="login-right">
        <div className="form-container">
        <img src={visibuyLogo} alt="VisiBuy Logo" className="sidebar-logo" />
          <div className="login-header">
            <h1>Create an Account</h1>
            <p>Please fill in the details to register.</p>
          </div>
          <form className="login-form" onSubmit={handleRegister}>
          <div class="input-group">
    <div class="name-inputs">
        <div class="input-wrapper">
            <label for="first-name">First Name  <span>*</span></label>
            <input
                  type="text"
                  placeholder="First Name"
                  value={fn}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
        </div>
        <div class="input-wrapper">
            <label for="last-name">Last Name  <span>*</span></label>
            
            <input
                  type="text"
                  placeholder="Last Name"
                  value={ln}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
        </div>
    </div>
</div>

            <div className="input-group">
              <label>Email <span>*</span></label>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>Phone Number <span>*</span></label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  maxLength="13"
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>Address <span>*</span></label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>Password <span>*</span></label>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>Confirm Password <span>*</span></label>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="remember-me">
              <input 
                type="checkbox" 
                id="remember" 
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="remember">By selecting the box, you agree to the Terms & Conditions of visibuy</label>
            </div>
            {/* <button type="submit" className="login-button">Sign Up</button> */}
            <button type="submit" className="login-button" disabled={loading}>
              {/* {loading ? "Signing Up..." : "Sign Up"} */}
              {loading ? <div className="loading-spinner"></div> : "Sign Up"}
            </button>
            <div className="form-footer">
              <p>Already have an account? <a href="#/login">Log In</a></p>
              <a href="#/forgetpassword">Forgot Password</a>
            </div>
          </form>
        </div>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default Register;
