const express = require('express');
const router = express.Router();
const Animal = require('../models/AnimalModels');
const Visits = require('../models/VisitsModel');

router.post('/InsertVisit', async (req, res) => {
    try {
        const requestData = req.body;
        const { animalID, visitDate, symptoms, category } = requestData;
        const animal = await Animal.findOne({ _id: animalID });// Find the animal based on its AnimalID

        if (!animal) {
            return res.status(404).json({ error: 'Animal not found' });
        }

        // Create a new visit instance
        const newVisit = new Visits({
            AnimalID: animal._id, // Assign the ObjectId of the found animal
            VisitDate: visitDate,
            Symptoms: symptoms,
            Category: category
        });

        // Save the new visit record to the database
        const savedVisit = await newVisit.save();
        res.json({ message: 'Visit record created successfully', id: savedVisit._id });
    } catch (error) {
        console.error('Error creating visit record:', error);
        res.status(500).json({ error: 'Error creating visit record' });
    }
})

// router.get('/InsertVisit', async (req, res) => {
//     // Handle GET requests for /InsertVisit
//     res.send('This is the GET request for InsertVisit');
// });

module.exports = router; 