const express = require('express');
const { addWeight, getWeightHistory } = require('../controllers/weightController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.use(protect); // All weight routes protected

router.post('/', addWeight);
router.get('/', getWeightHistory);

module.exports = router;
