'use client'
import { loginUser } from '@/apis/userAPI';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './login.css'

const Login: React.FC = () => {
  const [userEmail, setEmail] = useState<string>('');
  const [userPassword, setPassword] = useState<string>('');

  const route = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
      const result = await loginUser(userEmail);
      console.log(result);
      const {email, password} = result.data.isUser;
      password === userPassword ? route.push('/dashboard') : alert("Invalid Password");
    }catch(e){
      console.log(e)
    }
  
  
  };


  return (
    <div className="container">
      <div className="formWrapper">
        <h2>Login</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="submitButton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
