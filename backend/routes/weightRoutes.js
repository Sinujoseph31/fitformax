const express = require('express');
const { addWeight, getWeightHistory, deleteWeight } = require('../controllers/weightController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.use(protect); // All weight routes protected

router.post('/', addWeight);
router.get('/', getWeightHistory);
router.delete('/:id', deleteWeight);

module.exports = router;
