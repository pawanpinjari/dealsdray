import logo from './logo.svg';
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Update from './Components/Update';

function App() {
  return (
    <Routes>
    <Route path="register" element={<Register />} />
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/edit/:id" element={<Update />} />
   
  </Routes>

  );
}

export default App;
