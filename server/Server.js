const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json()); // Middleware to parse JSON in requests
app.use(cors());
const animalRoutes = require('./Routes/AnimalRoute');
app.use('/api', animalRoutes);

const filterDogs = require('./Routes/FilterDogsRoutes');
app.use('/api', filterDogs);

const DeleteAnimals = require('./Routes/DeleteAnimalRoute');
app.use('/api', DeleteAnimals);

const updateStatus = require('./Routes/UpdateStatusRoute');
app.use('/api', updateStatus);

const InsertVisits = require('./Routes/InsertVisitsRoute');
app.use('/api', InsertVisits);

const ShowVisits = require('./Routes/ShowVisitsRoute');
app.use('/api', ShowVisits);

const InsertAnimal = require('./Routes/InsertDogRoute');
app.use('/api', InsertAnimal);

mongoose.connect('mongodb://localhost:27017/petAdoption')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});