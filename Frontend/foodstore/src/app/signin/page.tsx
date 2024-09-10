'use client'
import React, { useState } from 'react';
import {createUser} from '../../apis/userAPI'
import './signin.css';
import { useRouter } from 'next/navigation';

const Signin: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
      const userInfo = {name, email, password}
      const result = await createUser(userInfo);
      console.log("Create user successfully", result);
      await alert("User Created Successfully!");
      router.push('/login');

    } catch(e){
      console.log(e);
    }
    
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };
  const login = () => {
    router.push('/login');
  };

  return (
    <div className='container'>
      <div className='formWrapper'>
        <h2>Sign In</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="submitButton">
            Submit
          </button>
          <button type="button" className="loginButton" onClick={login} >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
