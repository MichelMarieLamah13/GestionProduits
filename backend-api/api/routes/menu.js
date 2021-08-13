const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu');

router.get('/', menuController.get_all_menu);
router.post('/', menuController.add_menu);
router.patch('/:id/edit', menuController.update_menu);
router.patch('/:id/addTranslate', menuController.add_translation_to_menu);
router.patch('/:id/removeTranslate', menuController.remove_translation_to_menu);
router.delete('/:id', menuController.delete_menu);

module.exports = router;