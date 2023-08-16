import React, { useState } from 'react';
import Logo from '../assets/images/img/SuperKids.png';
import { useHref,useLocation} from 'react-router-dom';
const Navbar = () => {
  const currentDate = new Date().toLocaleDateString();
  const contactInfo = 'Email: info@ourschool.com | Phone: +1234567890';
  const address = '1234 School Gwalior, Madhya Pradesh, India';
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assuming this state reflects login status
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://server3.khaugalli.info/api/parents/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        console.log('Login successful');
  
        // Perform any actions you want after successful login
        // For example, you can set user authentication state or redirect to a different page
        alert('Login successful'); // Show success alert

  
        setLoginData({
          email: '',
          password: '',
        });
      } else {
        console.error('Login failed');
        alert('Login failed'); // Show error alert
        // Handle login failure, show error message, etc.
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred during login'); // Show error alert
      // Handle any error that occurred during the login process
    }
    setIsLoggedIn(true);
    setShowLoginModal(false); // Close the login modal
  };
  
  const [formData, setFormData] = useState({
    name: '',
    studentName: '',
    number: '',
    email: '',
    password: '',
    class: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://server3.khaugalli.info/api/parents/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data sent successfully');
        setShowRegisterModal(false);
        setFormData({
          name: '',
          studentName: '',
          number: '',
          email: '',
          password: '',
          class: '',
        });
        alert('Form submitted successfully');
      } else {
        console.error('Failed to send form data');
        alert('Failed to submit form');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred');
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    setFormData({
      name: '',
      studentName: '',
      number: '',
      email: '',
      password: '',
      class: '',
    });
  };

  // handleDashboardClick= () =>{
  //   window.location.href = '/dashboard'; 
  // }


  return (
    <nav>
      <div className="navbar-subheader">
        <p className="navbar-date">Today Date: {currentDate}</p>
        <p className="navbar-contact">{contactInfo}</p>
        <p className="navbar-address">Visit Our School: {address}</p>
      </div>
      <div className="navbar">
        <div className="navbar-logo">
          <img src={Logo} alt="School Logo" style={{ height: 100 }} />
        </div>
        <ul className="navbar-buttons">
        {isLoggedIn ? (
          <li>
            <button className="dashboard-button"  onClick={() => (window.location.href = '/dashboard')}>
              Dashboard
            </button>
          </li>
        ) : (
          <>
          <li>
            <button className="login-button" onClick={handleLoginClick}>
              Login
            </button>
          </li>
          <li>
          <button className="register-button" onClick={handleRegisterClick}>
            Register
          </button>
        </li>
        </>
        )}
 
    
          
        </ul>
      </div>
      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Login Form</h2>
            <form onSubmit={handleLoginSubmit}>
              {/* Input fields */}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={loginData.email} onChange={handleLoginInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={loginData.password} onChange={handleLoginInputChange} />
              </div>
              {/* Submit and Close buttons */}
              <div style={{justifyContent:"space-between"}}>
                <button style={{marginRight:10}} type="submit">Login</button>
    
                <button onClick={() => setShowLoginModal(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Register Form</h2>
            <form onSubmit={handleFormSubmit}>
              {/* Input fields */}
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="studentName">Student Name:</label>
                <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="number">Number:</label>
                <input type="text" id="number" name="number" value={formData.number} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="class">Class:</label>
                <input type="text" id="class" name="class" value={formData.class} onChange={handleInputChange} />
              </div>
              {/* Submit and Close buttons */}
              <div style={{justifyContent:'space-between'}}>
                <button style={{marginRight:10}} type="submit">Register</button>
                <button onClick={() => setShowRegisterModal(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
