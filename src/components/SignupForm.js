import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/signup/', user);
      console.log('Signed up:', response.data);
      // Handle successful signup, e.g., redirect to login page
    } catch (err) {
      console.error('Error:', err.response?.data?.error || 'An error occurred');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
