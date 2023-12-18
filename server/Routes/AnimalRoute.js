const express = require('express');
const Animal = require('../models/AnimalModels');
const DogBreed = require('../models/DogBreedModel.js');
const router = express.Router();
const app = express();
app.use(express.json())

// Route to get all Avialable Colors
router.get('/color', async (req, res) => {
    try {
        const uniqueColors = await Animal.aggregate([
            {
                $group: {
                    _id: '$Color',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    Color: '$_id',
                    count: 1
                }
            }
        ]);
        const colorsOnly = uniqueColors.map(colorObj => ({ label: colorObj.Color, value: colorObj.Color }));
        res.json(colorsOnly);
        // console.log(colorsOnly);
    } catch (error) {
        console.error('Error retrieving animals:', error); // Log any error that occurs
        res.status(500).json({ message: 'Error retrieving animals' });
    }
});

// Route to get all Available Breed
router.get('/age', async (req, res) => {
    try {
        const uniqueAges = await Animal.aggregate([
            {
                $group: {
                    _id: '$Age' // Grouping by the Age field
                }
            },
            {
                $project: {
                    _id: 0,
                    Age: '$_id' // Projecting the Age field
                }
            }
        ]);

        const agesOnly = uniqueAges.map(ageObj => ({ label: String(ageObj.Age), value: String(ageObj.Age) }));
        res.json(agesOnly);
        // console.log(agesOnly);
    } catch (error) {
        console.error('Error retrieving ages:', error);
        res.status(500).json({ message: 'Error retrieving ages' });
    }
});

// Route to get all Available Breed
router.get('/breed', async (req, res) => {
    try {
        const dogBreed = await DogBreed.find({}, 'BreedID BreedName')
        const breed = dogBreed.map(breedObj => ({ label: breedObj.BreedName, value: String(breedObj.BreedID) }));
        res.json(breed);
    } catch (error) {
        console.error('Error retrieving ages:', error);
        res.status(500).json({ message: 'Error retrieving ages' });
    }
});
module.exports = router;