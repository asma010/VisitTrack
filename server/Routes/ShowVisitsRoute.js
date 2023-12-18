const express = require('express');
const router = express.Router();
// const Animal = require('../models/AnimalModels');
const Visits = require('../models/VisitsModel');
router.post('/ShowVisit', async (req, res) => {
    try {
        const requestData = req.body;
        const ID = requestData.ID;
        const visits = await Visits.find({ AnimalID: ID });// Find the animal based on its AnimalID
        if (visits == null) {
            res.send(null);
        } else { 
            // console.log(visits)
            res.json({ visits });
        }


    } catch (error) {
        console.error('Error creating visit record:', error);
        res.status(500).json({ error: 'Error creating visit record' });
    }
})

module.exports = router; 