const express = require('express');
const router = express.Router();
const Animal = require('../models/AnimalModels');
const DogBreed = require('../models/DogBreedModel');
// Route to handle incoming GET request to '/api/DogsSelectedData'
// Get the selected dogs
// ... (previous imports and route definition)

router.post('/DogsSelectedData', async (req, res) => {
    try {
        const requestData = req.body;
        const selectedOption = requestData.selectedOption;
        const selectedField = requestData.selectedField;

        let query = {};

        if (selectedOption === 'Age') {
            query = { Age: parseInt(selectedField) };
        } else if (selectedOption === 'Color') {
            query = { Color: selectedField };
        } else if (selectedOption === 'gender') {
            query = { Gender: selectedField };
        } else if (selectedOption === 'DogBreed') {
            const Breed = await DogBreed.find({ BreedID: parseInt(selectedField) })
            const animals = await Animal.find({ BreedID: Breed[0]._id }).populate({
                path: 'BreedID',
                select: 'BreedName' // Select only the BreedName field
            });;
            res.json(animals);
            return ;
        }

        const animals = await Animal.find(query).populate({
            path: 'BreedID',
            select: 'BreedName' // Select only the BreedName field
        });
        // console.log(animals);
        res.json(animals);

    } catch (error) {
        console.log('Erro r retrieving dogs:', error);
        res.status(500).json({ error: 'Error retrieving dogs' });
    }
});

module.exports = router;

/* const animals = await Animal.find(query);//.populate(BreedID);
  console.log(animals)
  const populatedAnimals = [];
  for (const animal of animals) {
      const breed = await DogBreed.findOne({ BreedID: animal.BreedID });
      const populatedAnimal = {
          ...animal._doc,
          breedName: breed ? breed.BreedName : 'Unknown'
      };
      populatedAnimals.push(populatedAnimal);
  }*/

// console.log(populatedAnimals);
// res.json(populatedAnimals);