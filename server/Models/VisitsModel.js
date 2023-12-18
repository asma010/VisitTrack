const mongoose = require('mongoose');

const Animal = require('./AnimalModels');
const VisitsSchema = new mongoose.Schema({
    AnimalID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal'
    },
    VisitDate: Date,
    Symptoms: String,
    Category: String
});

const Visits = mongoose.model("visits", VisitsSchema)

module.exports = Visits;