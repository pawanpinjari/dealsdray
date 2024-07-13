import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    f_userName: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.f_userName || !formData.password) {
      setError('Both fields are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post('http://localhost:8000/api/login', formData);
      if (res.data) {
        localStorage.setItem('username', res.data.useName);
        navigate('/dashboard');
      } else {
        alert('Invalid login details');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
       <div className='title'>Create Employee</div>
       <div className='container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Username </label>
          <input type="text" name="f_userName" onChange={handleChange} value={formData.f_Email} />
        </div>
        <div>
          <label>Password </label>
          <input type="password" name="password" onChange={handleChange} value={formData.password} />
        </div>
        <div>
          {error && <p>{error}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
    </div>
    

  );
};

export default Login;
