const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Employee = require('./Schema/register');
const auth = require('./Routes/auth');
const del = require('./Routes/del');
const updateEmp = require("./Routes/editEmp")
const app = express();
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/dealsdray')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

app.get('/', async (req, res) => { });

app.use('/api', auth);
app.use('/api/deleteEmp', del);
app.use('/api/updateEmp', updateEmp);

const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
