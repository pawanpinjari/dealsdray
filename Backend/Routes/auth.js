const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../Schema/register');
const cors = require('cors');
const router = express.Router();


router.use(cors());
router.post('/register', async (req, res) => {
  const { f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, password } = req.body;

  try {
    const exit = await Employee.findOne({ f_Email });
    if (exit) {
      return res.json({ message: 'Employee already exists' });
    }

    const newEmployee = new Employee({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
      f_Image
    
    });
    console.log(newEmployee)
    await newEmployee.save();
    res.json({ message: 'Success' });
  } catch (error) {
    res.json({ message: 'error' });
  }
});


router.post('/login', async (req, res) => {
  const { f_userName, password } = req.body;
  if (f_userName == 'admin' && password == 'password') {
    res.json({ useName: f_userName });
  } else {
    res.json({ success: false });
  }

});

router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    res.json({ message: 'Error fetching employees' });
  }
});
module.exports = router;