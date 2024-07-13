const mongoose = require('mongoose');

function getISTDate() {
    const currentDate = new Date();
    const offsetIST = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const currentISTDate = new Date(currentDate.getTime() + offsetIST);
    return currentISTDate;
}

const employeeSchema = new mongoose.Schema({
    f_Id: String,
    f_Image: String,
    f_Name: String,
    f_Email: { type: String, required: true, unique: true },
    f_Mobile: String,
    f_Designation: String,
    f_Gender: String,
    f_Course: String,
    f_Createdate: { type: Date, default: getISTDate }
});

module.exports = mongoose.model('Employee', employeeSchema);
