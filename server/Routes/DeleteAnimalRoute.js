const express = require('express');
const router = express.Router();
const Animal = require('../models/AnimalModels');

router.post('/deleteDog', async (req, res) => {
    try {
        const requestData = req.body;
        const animalID = requestData.animalID;
        // console.log('Received animalID:', animalID);

        // Use async/await to perform the findOneAndDelete operation
        const deletedAnimal = await Animal.findOneAndDelete({ _id: animalID });

        if (deletedAnimal) {
            // console.log("Deleted animal:", deletedAnimal);
            res.send('Dog deleted successfully. Please refresh the page.');
        } else {
            console.log("Animal not found with ID ", animalID);
            res.status(404).send('Animal not found');
        }
    } catch (error) {
        console.log('Error deleting dog:', error);
        res.status(500).json({ error: 'Error deleting dog' });
    }
});


module.exports = router;