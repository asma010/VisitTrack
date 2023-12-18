const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  Name: String,
  Age: Number,
  Gender: String,
  Color: String,
  Weight: Number,
  DateRescued: Date,
  Status: String,
  BreedID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dogBreed'
  }
});

const Animal = mongoose.model("Animal", AnimalSchema)

module.exports = Animal;