const express = require('express');
const router = express.Router();
const ProduitAssocieController = require('../controllers/ProduitAssocie');
const checkAuth = require('../middlewares/check-auth');

// Get all produitAssocies: GET http://localhost:port/produitAssocies
router.get('/',ProduitAssocieController.get_all_produitAssocies);

// Add a produitAssocie: POST http://localhost:port/produitAssocies
router.post('/', checkAuth,ProduitAssocieController.add_produitAssocie);

// Update a produitAssocie: PATCH http://localhost:port/produitAssocies
router.patch('/:id', checkAuth,ProduitAssocieController.update_produitAssocie);

// Get a produitAssocie by id: GET http://localhost:port/produitAssocies/id
router.get('/:id', checkAuth,ProduitAssocieController.get_produitAssocie_by_id);

// Delete a produitAssocie by id: DELETE http://localhost:port/produitAssocies/id
router.delete('/:id', checkAuth, ProduitAssocieController.delete_produitAssocie);

// Delete all produitAssocies: DELETE http://localhost:port/produitAssocies/
router.delete('/', checkAuth, ProduitAssocieController.deleteAll_produitAssocies);

module.exports = router;