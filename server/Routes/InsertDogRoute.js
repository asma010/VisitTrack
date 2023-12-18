const express = require('express');
const router = express.Router();
const Animal = require('../models/AnimalModels');
const DogBreed = require('../models/DogBreedModel');

router.post('/InsertDog', async (req, res) => {
    try {
        const requestData = req.body;
        const { name, age, weight, gender, color, breed, dateRescued, status } = requestData;
        const dogBreed = await DogBreed.findOne({ BreedName: breed });

        if (!dogBreed) {
            return res.json({ message: 'You have to create a new dog breed first!', error: 'You have to create a new dog breed first!' });
        }

        const newAnimal = new Animal({
            Name: name,
            Age: age,
            Weight: weight,
            Gender: gender,
            Color: color,
            BreedID: dogBreed._id,
            DateRescued: dateRescued,
            Status: status,
        });

        // Save the new visit record to the database
        const savedAnimal = await newAnimal.save();
        res.json({ message: 'New Dog has been added', id: savedAnimal._id });
    } catch (error) {
        console.error('Error creating visit record:', error);
        res.status(500).json({ error: 'Error creating visit record' });
    }
})

module.exports = router; 