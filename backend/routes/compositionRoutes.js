const express = require('express');
const router = express.Router();
const { addCompositionLog, getCompositionLogs, deleteCompositionLog } = require('../controllers/compositionController');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, addCompositionLog).get(protect, getCompositionLogs);
router.route('/:id').delete(protect, deleteCompositionLog);

module.exports = router;
