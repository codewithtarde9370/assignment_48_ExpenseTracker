import React, { useState } from 'react'
import './login.css'
import './../../index.css'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginNow = async() => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email: email,
      password: password
    })
    if(response.data.success){
      toast.success(response.data.message)

      localStorage.setItem('currentUser', JSON.stringify(response.data.data))

     toast.loading('Redirecting to dashboard...')

     setTimeout(()=>{
       window.location.href = '/'
     }, 3000)
    }else{
      toast.error(response.data.message)
    }
  }

  
  return (
    <div><h1 className='title'>Login</h1>
     
<form className='form'>

<input
type='email'
placeholder='Email'
className='user-input'
value={email}
onChange={(e) => setEmail(e.target.value)}
/>

<input 
type='password' 
required 
placeholder='Password' 
className='user-input'
value={password}
onChange={(e) => setPassword(e.target.value)}
/> 

<button className='btn' onClick={loginNow}>Login</button>

</form>

<Link to='/signup' className='link'>Already have an account? signup</Link>
<Toaster/>

</div>
  )
}

export default Login