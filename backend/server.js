require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use('/api/tasks', tasksRouter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Mongo connection error:', err));
