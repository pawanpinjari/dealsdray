// routes/employees.js
const express = require('express');
const router = express.Router();
const Employee = require('../Schema/register');



router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updated = await Employee.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) {
            return res.json({ message: 'Employee not found' });
        }
        res.json(updated);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
