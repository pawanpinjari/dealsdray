import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import EmpList from './EmpList';
import Navbar from './Navbar';
import Update from './Update';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [active, setActive] = useState('home'); // Initialize active state
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <Navbar setActive={setActive} username={username} handleLogout={handleLogout} />

      <div className="dashboard-content">
        {active === 'home' && <div>
          <div className='title'>Dashboard</div>
          <h1>Welcome Admin Panel</h1>
        </div>}
        {active === 'employeeList' && <EmpList />}
      </div>
    </div>
  );
};

export default Dashboard;
