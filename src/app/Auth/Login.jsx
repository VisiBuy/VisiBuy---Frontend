import React, { useState, useEffect } from 'react';
import './test.css';
import { useNavigate } from 'react-router-dom';
import visibuyLogo from '../../assets/logo11.png';
import lockIcon from '../../assets/lock.png';
import emailIcon from '../../assets/mail.png';
import { login } from '../../services/authServices';
import Notification from '../../Notification';
import Left_Blue from './Auth_left';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
  const [identifier, setIdentifier] = useState(''); // Single input field for email or phone
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Determine if identifier is email or phone
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
      const loginData = {
        pass: password,
        ...(isEmail ? { email: identifier } : { phone: identifier })
      };
  
      const { token } = await login(loginData);
      localStorage.setItem('authToken', token);
      localStorage.setItem('tokenExpiry', new Date().getTime() + (3 * 24 * 60 * 60 * 1000));
      navigate('/');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      setNotification({ message: error.msg || 'An error occurred during login.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="login-container">
      <Left_Blue page={"Login"} />
      <div className="login-right">
        <div className="form-container">
          <img src={visibuyLogo} alt="VisiBuy Logo" className="sidebar-logo" />
          <div className="login-header">
            <h1>Welcome back!</h1>
            <p>Please enter your login details.</p>
          </div>
          <form className="login-form" onSubmit={handleLogin} style={{ height: 'auto' }}>
            <div className="input-group">
              <label>Email/Phone Number <span>*</span></label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Enter email/phone number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
                 {/* <FontAwesomeIcon icon={faEnvelope} className="input-icon" /> */}
                {/* <img src={emailIcon} alt="Email Icon" className="input-icon" /> */}
              </div>
            </div>
            <div className="input-group">
              <label>Password <span>*</span></label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="input-icon cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? <div className="loading-spinner"></div> : "Sign In"}
            </button>
            <div className="form-footer">
              <p>Don’t have an account? <a href="#/register">Sign Up</a></p>
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

export default Login;
