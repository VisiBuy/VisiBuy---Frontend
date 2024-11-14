// src/components/Auth/ForgotPassword.jsx
import React, { useState, useEffect } from 'react';
import './test.css';
import visibuyLogo from '../../assets/logo11.png';
import lockIcon from '../../assets/lock.png';
import { forgotPassword } from '../../services/authServices';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notification from '../../Notification'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for tracking submission

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset previous messages
    setError('');
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      setMessage(response.msg); // Show success message
      setIsSubmitted(true); // Update submission state
      setLoading(false);
      setNotification({ message: 'Reset Link Sent', type: 'success' });
    } catch (err) {
      setError(err.msg); // Show error message
      setLoading(false);
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 50000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={visibuyLogo} alt="VisiBuy Logo" className="sidebar-logo" />
        <div className="login-text">
          <img src={lockIcon} alt="Lock Icon" className="lock-icon" />
          <span>Forgot Password</span>
        </div>
      </div>
      <div className="login-right">
        <div className="form-container">
        <img src={visibuyLogo} alt="VisiBuy Logo" className="sidebar-logo" />
          <div className="login-header">
            <h1>Forgot Password?</h1>
            <p>Enter your registered email address and we’ll send you a password reset link.</p>
          </div>
          {isSubmitted ? ( // Conditional rendering based on submission state
            <div className="reset-success" style={{ height: 'auto' }}>
              <i><p>{message}</p> </i>{/* Display success message */}
              {/* <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye} // Toggle between eye and eye-slash icon
                  className="input-icon cursor-pointer"
                  onClick={handleTogglePasswordVisibility}
                /> */}
                <div className="success-icon-container">
      <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
    </div>
                {/* <FontAwesomeIcon icon={faCheckCircle} className="success-icon" /> */}
            </div>
          ) : (
            <form className="login-form" onSubmit={handleSubmit} style={{ height: 'auto' }}>
              <div className="input-group">
                <label>Email <span>*</span></label>
                <div className="input-wrapper">
                  <input 
                    type="email" 
                    placeholder="Enter email address" 
                    required 
                    value={email} 
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? <div className="loading-spinner"></div> : "Reset Password"}
              </button>
              <div className="form-footer">
                <p>Back to <a href="#/login">Sign In</a></p>
              </div>
            </form>
          )}
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

export default ForgotPassword;
