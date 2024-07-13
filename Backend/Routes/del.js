const cors = require('cors');
const express = require('express');
const router = express.Router();
const Employee = require('../Schema/register');

router.use(cors());
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) {
      return res.json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
