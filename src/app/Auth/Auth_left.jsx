import React, { useState, useEffect } from 'react';
import './test.css';
import { useNavigate } from 'react-router-dom';
import visibuyLogo from '../../assets/logo11.png';  
import lockIcon from '../../assets/lock.png';
import emailIcon from '../../assets/mail.png';  
import { login } from '../../services/authServices';
import Notification from '../../Notification'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Left_side=({page}) => {
    return (
        <div className="login-left">
        <a href="/">
          <img src={visibuyLogo} alt="VisiBuy Logo" className="sidebar-logo" />
        </a>
        <div className="login-text">
          <img src={lockIcon} alt="Lock Icon" className="lock-icon" />
          <span>{page}</span>
        </div>
      </div>
    );
};

export default Left_side;
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [phoneNumberRaw, setPhoneNumberRaw] = useState('');
//   const [error, setError] = useState(null);
//   const [notification, setNotification] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { token } = await login(email, password, phoneNumberRaw);
//       localStorage.setItem('authToken', token); 
//       localStorage.setItem('tokenExpiry', new Date().getTime() + (3 * 24 * 60 * 60 * 1000)); 
//       navigate('/');
//     } catch (error) {
//       setError('Login failed. Please check your credentials.');
//       setNotification({ message: 'Login failed. Please try again.', type: 'error' });
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (notification) {
//       const timer = setTimeout(() => setNotification(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   const handlePhoneNumberChange = (e) => {
//     let input = e.target.value.replace(/\D/g, '');
//     setPhoneNumberRaw(input);
//     if (input.length > 3 && input.length <= 7) {
//       input = `${input.slice(0, 3)}-${input.slice(3)}`;
//     } else if (input.length > 7) {
//       input = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
//     }
//     setPhoneNumber(input);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleCloseNotification = () => {
//     setNotification(null);
//   };

//   return (
//     <div className="login-container">
      
//       <div className="login-right">
//         <div className="form-container">
//           <img src={visibuyLogo} alt="VisiBuy Logo" className="sidebar-logo" />
//           <div className="login-header">
//             <h1>Welcome back!</h1>
//             <p>Please enter your login details.</p>
//           </div>
//           <form className="login-form" onSubmit={handleLogin} style={{ height: 'auto' }}>
//             <div className="input-group">
//               <label>Email <span>*</span></label>
//               <div className="input-wrapper">
//                 <input
//                   type="email"
//                   placeholder="Enter email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <img src={emailIcon} alt="Email Icon" className="input-icon" />
//               </div>
//             </div>
//             <div className="input-group">
//               <label>Phone Number <span>*</span></label>
//               <div className="input-wrapper">
//                 <input
//                   type="tel"
//                   inputMode="numeric"
//                   placeholder="Enter Phone Number"
//                   value={phoneNumber}
//                   onChange={handlePhoneNumberChange}
//                   maxLength="14"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="input-group">
//               <label>Password <span>*</span></label>
//               <div className="input-wrapper">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <FontAwesomeIcon
//                   icon={showPassword ? faEyeSlash : faEye}
//                   className="input-icon cursor-pointer"
//                   onClick={togglePasswordVisibility}
//                 />
//               </div>
//             </div>
//             {error && <p className="error-message">{error}</p>}
//             <div className="remember-me">
//               <input type="checkbox" id="remember" />
//               <label htmlFor="remember">Remember me</label>
//             </div>
//             <button type="submit" className="login-button" disabled={loading}>
//               {loading ? <div className="loading-spinner"></div> : "Sign In"}
//             </button>
//             <div className="form-footer">
//               <p>Don’t have an account? <a href="#/register">Sign Up</a></p>
//               <a href="#/forgetpassword">Forgot Password</a>
//             </div>
//           </form>
//         </div>
//       </div>
//       {notification && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           onClose={handleCloseNotification}
//         />
//       )}
//     </div>
//   );
// };

// export default Login;
