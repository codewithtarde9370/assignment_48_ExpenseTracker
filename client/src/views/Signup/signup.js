import React, { useState } from 'react';
import './signup.css';
import './../../index.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Signup() {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: ''
  });

  const signup = async (event) => {
    event.preventDefault(); 

    const { fullName, email, password, dob } = user;

    if (!fullName || !email || !password || !dob) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        fullName,
        email,
        password,
        dob
      });

      if (response.data.success) {
        toast.success(response.data.message);

        setUser({
          fullName: '',
          email: '',
          password: '',
          dob: ''
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h1 className='title'>User Registration</h1>
      <form className='form' onSubmit={signup}>
        <input
          type='text'
          id='fullName'
          name='fullName'
          placeholder='Enter Your Full Name'
          className='user-input'
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        />

        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email ID'
          className='user-input'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          className='user-input'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <input
          type='date'
          id='dob'
          name='dob'
          placeholder='Date Of Birth'
          className='user-input'
          value={user.dob}
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
        />

        <button className='btn' type='submit'>Register</button>
      </form>

      <Link to='/login' className='link'>Already have an account? Login</Link>
      <Toaster />
    </div>
  );
}

export default Signup;
