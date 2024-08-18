import React, { useState } from 'react';
import './login.css';
import './../../index.css';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginNow = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password
      });

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('currentUser', JSON.stringify(response.data.data));

        toast.loading('Redirecting to dashboard...');

        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h1 className='title'>Login</h1>

      <form className='form' onSubmit={loginNow}>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          className='user-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          className='user-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className='btn' type='submit'>Login</button>
      </form>

      <Link to='/signup' className='link'>Don't have an account? Sign up</Link>
      <Toaster />
    </div>
  );
}

export default Login;
