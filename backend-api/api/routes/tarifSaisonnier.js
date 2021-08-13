const express = require('express');
const router = express.Router();
const TarifSaisonnierController = require('../controllers/TarifSaisonnier');
const checkAuth = require('../middlewares/check-auth');

// Get all tarifSaisonniers: GET http://localhost:port/tarifSaisonniers
router.get('/',TarifSaisonnierController.get_all_tarifSaisonniers);

// Add a tarifSaisonnier: POST http://localhost:port/tarifSaisonniers
router.post('/', TarifSaisonnierController.add_tarifSaisonnier);

// Update a tarifSaisonnier: PATCH http://localhost:port/tarifSaisonniers
router.patch('/:id', TarifSaisonnierController.update_tarifSaisonnier);

// Get a tarifSaisonnier by id: GET http://localhost:port/tarifSaisonniers/id
router.get('/:id', TarifSaisonnierController.get_tarifSaisonnier_by_id);

// Delete a tarifSaisonnier by id: DELETE http://localhost:port/tarifSaisonniers/id
router.delete('/:id', TarifSaisonnierController.delete_tarifSaisonnier);

// Delete all tarifSaisonniers: DELETE http://localhost:port/tarifSaisonniers/
router.delete('/', TarifSaisonnierController.deleteAll_tarifSaisonniers);


module.exports = router;