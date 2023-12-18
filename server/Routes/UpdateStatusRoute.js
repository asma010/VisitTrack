const express = require('express');
const router = express.Router();
const Animal = require('../models/AnimalModels');

router.post('/updateAnimalStatus', async (req, res) => {
    try {
        const requestData = req.body;
        const animalID = requestData.animalID;
        const newStatus = requestData.newStatus;
        // console.log('animalID: ' + animalID + 'newStatus: ' + newStatus);

        const updatedAnimal = await Animal.findOneAndUpdate(
            { _id: animalID },
            { $set: { Status: newStatus } },
            { new: true }
        );

        if (updatedAnimal) {
            console.log("Updated animal:");//, updatedAnimal);
            res.send('Animal ' + animalID + ' has been status updated successfully');
        } else {
            console.log("Animal not found with ID ", animalID);
            res.status(404).send('Animal not found');
        }
    } catch (error) {
        console.log('Error updating animal status:', error);
        res.status(500).json({ error: 'Error updating animal status' });
    }
});

module.exports = router;