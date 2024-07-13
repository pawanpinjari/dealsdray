import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_Gender: '',
        f_Course: '',
        f_Image: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/updateEmp/${id}`)
            .then(res => {
                setEmployee(res.data);
            })
            .catch(err => console.error('Error :', err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: value
        }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (file && allowedTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEmployee({ ...employee, [e.target.name]: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            alert('Only JPG and PNG files are allowed.');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/updateEmp/${id}`, employee);
            console.log(`Employee with ID ${id} updated successfully`);
            navigate('/dashboard');
        } catch (error) {
            console.error(`Error updating employee with ID ${id}:`, error);
        }
    };

    return (
        <div>
            <div >
                <div className='title'>Edit Employee</div>
                <form onSubmit={handleSubmit} className="container">
                    <div>
                        <label>Name: </label>
                        <input type="text" name="f_Name" value={employee.f_Name} onChange={handleChange} />

                    </div>

                    <div>
                        <label> Email: </label>
                        <input type="email" name="f_Email" value={employee.f_Email} onChange={handleChange} />

                    </div>

                    <div>
                        <label>
                            Mobile:
                        </label>

                        <input type="text" name="f_Mobile" value={employee.f_Mobile} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Designation </label>
                        <select name="f_Designation" onChange={handleChange} value={employee.f_Designation}>
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>

                    <div>
                        <label>Gender </label>
                        <label> <input type="radio" name="f_Gender" value="Male" onChange={handleChange} checked={employee.f_Gender === 'Male'} /> Male </label>
                        <label> <input type="radio" name="f_Gender" value="Female" onChange={handleChange} checked={employee.f_Gender === 'Female'} />
                            Female
                        </label>
                    </div>

                    <div>
                        <label>Course </label>
                        <label>
                            <input type="checkbox" name="f_Course" value="MCA" onChange={handleChange} checked={employee.f_Course === 'MCA'} />
                            MCA
                        </label>
                        <label>
                            <input type="checkbox" name="f_Course" value="BCS" onChange={handleChange} checked={employee.f_Course === 'BCS'} />
                            BSc
                        </label>
                        <label>
                            <input type="checkbox" name="f_Course" value="BCA" onChange={handleChange} checked={employee.f_Course === 'BCA'} />
                            BCA
                        </label>
                    </div>

                    <div>
                        <label>Image </label>
                        <input type='file' name='f_Image' onChange={handleImageChange} />
                    </div>

                    <div>
                        <button type="submit">Update Employee</button>

                    </div>
                </form>
            </div>
        </div>

    );
};

export default Update;
