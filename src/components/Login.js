import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  const correctUsername = 'admin';
  const correctPassword = 'password';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === correctUsername && password === correctPassword) {
      setIsLoggedIn(true); // Set isLoggedIn to true
      onLogin();
      history.push('/product-list');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false
    history.push('/login'); // Redirect to login page
  };

  if (isLoggedIn) {
    return (
      <div style={styles.container}>
        <h2>Welcome, {username}!</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <button type="submit" style={styles.submitButton}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f4f4f4',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '90%',
    padding: '12px',
    marginTop: '5px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    transition: 'border-color 0.3s ease',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: '500',
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  logoutButton: {
    padding: '12px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  },
};

export default Login;
