import React, { useState } from 'react';
import axios from 'axios';
import './style.css'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_Gender: '',
        f_Course: '',
        f_Image: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (file && allowedTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, [e.target.name]: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            alert('Only JPG and PNG files are allowed.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const res = await axios.post('http://localhost:8000/api/register', formData);
            if (res.data.message == "Success") {
                navigate('/dashboard')
            }
            else {
                alert("error")
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className='title'>Create Employee</div>
            <div >
                <form onSubmit={handleSubmit} className='container'>

                    <div>
                        <label>Name </label>
                        <input type="text" name="f_Name" placeholder="Name" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email </label>
                        <input type="email" name="f_Email" placeholder="Email" onChange={handleChange} />

                    </div>
                    <div>
                        <label>Mobile </label>
                        <input type="text" name="f_Mobile" placeholder="Mobile" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Designation </label>
                        <select name="f_Designation" onChange={handleChange} value={formData.f_Designation}>
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <div>
                        <label>Gender </label>
                        <label> <input type="radio" name="f_Gender" value="Male" onChange={handleChange} checked={formData.f_Gender === 'Male'} /> Male </label>
                        <label> <input type="radio" name="f_Gender" value="Female" onChange={handleChange} checked={formData.f_Gender === 'Female'} />
                            Female
                        </label>
                    </div>

                    <div>
                        <label>Course </label>
                        <label>
                            <input type="checkbox" name="f_Course" value="MCA" onChange={handleChange} checked={formData.f_Course === 'MCA'} />
                            MCA
                        </label>
                        <label>
                            <input type="checkbox" name="f_Course" value="BCS" onChange={handleChange} checked={formData.f_Course === 'BCS'} />
                            BSc
                        </label>
                        <label>
                            <input type="checkbox" name="f_Course" value="BCA" onChange={handleChange} checked={formData.f_Course === 'BCA'} />
                            BCA
                        </label>
                    </div>
                    <div>
                        <label>Image </label>
                        <input type='file' name='f_Image' onChange={handleImageChange} />
                    </div>
                  
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>


    );
};

export default Register;
