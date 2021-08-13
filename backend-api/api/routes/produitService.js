const express = require('express');
const router = express.Router();
const ProduitServiceController = require('../controllers/produitService');
const checkAuth = require('../middlewares/check-auth');
const upload = require('../controllers/uploadFile');
const imgFields = [
    {name: 'imgPd1', maxCount: 1},
    {name: 'imgPd2', maxCount: 1},
    {name: 'imgPd3', maxCount: 1},
    {name: 'imgPd4', maxCount: 1},
    {name: 'imgPd5', maxCount: 1}
];

// Get all produitServices: GET http://localhost:port/produitServices
router.get('/', ProduitServiceController.get_all_produitServices);

// Add a produitService: POST http://localhost:port/produitServices
router.post('/',
    upload.fields(imgFields),
    ProduitServiceController.add_produitService
);

/*router.post('/',
    upload.single('imgPd'),
    ProduitServiceController.add_produitService
);*/
// router.post('/', ProduitServiceController.add_produitService);

// Update a produitService: POST http://localhost:port/produitServices
/*router.patch('/:id',
    checkAuth,
    upload.fields(imgFields),
    ProduitServiceController.update_produitService
);*/
router.patch('/:id',ProduitServiceController.update_produitService);

// Get a produitService by id: GET http://localhost:port/produitServices/id
router.get('/:id', ProduitServiceController.get_produitService_by_id);

// Delete a produitService by id: DELETE http://localhost:port/produitServices/id
router.delete('/:id', ProduitServiceController.delete_produitService);

// Delete all produitServices
router.delete('/', checkAuth, ProduitServiceController.deleteAll_produitServices);

// Add tarifSaisonnier to list
router.patch('/:id/addTarifSaisonnier',ProduitServiceController.add_tarifSaisonnier_to_list);

// Delete tarifSaisonnier from list
router.patch('/:id/deleteTarifSaisonnier',ProduitServiceController.delete_tarifSaisonnier_from_list);

module.exports = router;