const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translation');

router.get('/', translationController.get_all_translation);
router.post('/', translationController.add_translation);
router.patch('/:id/edit', translationController.update_translation);
router.delete('/:id', translationController.delete_translation);

module.exports = router;
