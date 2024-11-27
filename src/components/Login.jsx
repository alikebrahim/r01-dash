import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
  // NOTE: what are those two functions below (what do they represent) and how are they used?
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Function to execute upon form submission
  const onSubmit = async (data) => {
    try {
      const base64Credentials = btoa(`${data.username || data.email}:${data.password}`);
      const response = await axios.post('https://learn.reboot01.com/api/auth/signin', null, {
        headers: {
          'Authorization': `Basic ${base64Credentials}`
        }
      });

      if (response.data) {
        // console.log(response.data)
        localStorage.setItem('token', response.data);
        // NOTE: I suppose here is where I should process the jwt bearer token login,to precede the immediate navigation to the dashboard
        navigate('/dashboard');
      } else {
        // NOTE: Better error handling should be used here for invalid credentials
        alert('Invalid credentials');
      }
    } catch (error) {
      // NOTE: Better error handling should be used here for login error
      console.error('Login Error:', error);
      alert('Login failed, please try again.');
    }
  };

  // NOTE: what is ...register
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username', { required: true })} placeholder="Username or Email" />
      {errors.username && <span>This field is required</span>}

      <input {...register('password', { required: true })} type="password" placeholder="Password" />
      {errors.password && <span>This field is required</span>}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
