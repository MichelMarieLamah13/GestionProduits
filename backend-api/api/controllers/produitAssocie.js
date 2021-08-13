const ProduitAssocie = require('../models/ProduitAssocie');

// Get all tarif saisonniers
exports.get_all_produitAssocies = (req, res, next) => {
    ProduitAssocie.find()
        .select({ __v: 0 })
        .then(produitAssocies => {
            res.status(200).json(produitAssocies);
        }).catch(error => {
            console.log(error);
        });
};

// Add produitAssocie
exports.add_produitAssocie = (req, res, next) => {
    let data = req.body;
    const produitAssocie = new ProduitAssocie(data);
    produitAssocie.save().then(produitAssocie => {
        res.status(200).json(produitAssocie);
    }).catch(error => {
        console.log(error);
    })
};
// Update produitAssocie
exports.update_produitAssocie = (req, res, next) => {
    ProduitAssocie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(produitAssocie => {
        res.status(200).json(produitAssocie);
    }).catch(error => {
        console.log(error);
    });
};

// Delete produitAssocie
exports.delete_produitAssocie = (req, res, next) => {
    ProduitAssocie.findByIdAndDelete(req.params.id).then(produitAssocie => {
        if (!produitAssocie) {
            res.status(404).json({
                message: 'There is no produitAssocie with the specified id'
            });
        } else {
            res.status(200).json({
                message: 'ProduitAssocie deleted successfully',
                deletedProduitAssocie: produitAssocie,
                request: {
                    listProduitAssocies: {
                        type: 'GET',
                        url: `http://localhost:${process.env.PORT}/produitAssocies`
                    },
                    createProduitAssocie: {
                        type: 'POST',
                        url: `http://localhost:${process.env.PORT}/produitAssocies`,
                        body: {
                            name: 'String',
                            price: 'Number'
                        }
                    }
                }
            });
        }

    }).catch(error => {
        console.log(error);
    });
};
// Get produitAssocie by id
exports.get_produitAssocie_by_id = (req, res, next) => {

    ProduitAssocie.findById(req.params.id, (error, doc)=>{
        if (error){
            console.log(error)
        }else{
            res.status(200).json(doc);
        }
    });
};

// Delete All produitAssocies
exports.deleteAll_produitAssocies = (req, res, next) => {
    ProduitAssocie.deleteMany({}, (error, doc)=>{
        if (error){
            console.log(error);
        }else{
            res.status(200).json(doc);
        }
    })
};