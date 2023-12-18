const mongoose = require('mongoose');

const DogBreedSchema = new mongoose.Schema({
    BreedID: Number,
    BreedName: String,
    Characteristics: String,
  },{ collection: 'dogbreed' });

const DogBreed = mongoose.model("dogBreed", DogBreedSchema)

module.exports = DogBreed;