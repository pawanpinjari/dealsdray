import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const EmpList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {

      await axios.delete(`http://localhost:8000/api/deleteEmp/${id}`);
      // Remove the deleted employee from state
      setEmployees(employees.filter(employee => employee._id !== id));
      console.log(`Employee with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error);
    }
  };

  return (
    <div>
      <div className='title'>Employee List</div>
      <div className="emp-list">
       
        <div className="emp-list-header">
        <div></div>
        <div></div>
        <div></div>
          <div>
            <span>Total Count: {employees.length}</span>
            <button className='btn' onClick={() => navigate('/register')}>Create Employee</button>
          </div>
          <div>
          <span>Search:</span>
          <input
            type="text"
            placeholder="Enter Search Keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
          
        </div>
        <table>
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.filter(employee => employee.f_Name.includes(searchTerm)).map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><img src={employee.f_Image} alt="image" /></td>
                <td>{employee.f_Name}</td>
                <td>{employee.f_Email}</td>
                <td>{employee.f_Mobile}</td>
                <td>{employee.f_Designation}</td>
                <td>{employee.f_Gender}</td>
                <td>{employee.f_Course}</td>
                <td>{new Date(employee.f_Createdate).toLocaleDateString()}</td>
                <td>
                  <button className='btn' onClick={() => handleEdit(employee._id)}>Edit</button>
                  <button className='btn' onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default EmpList;
