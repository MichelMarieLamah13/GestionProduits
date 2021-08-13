const ProduitService = require('../models/ProduitService');

// Get all produitServices
exports.get_all_produitServices = (req, res, next) => {
    ProduitService.find({})
        .populate('tarifSaisonnier')
        .exec((error, docs) => {
            if (error) {
                console.log(error);
            } else {
                res.status(200).json(docs);
            }
        });
};

// Add produitService
exports.add_produitService = (req, res, next) => {
    let data = req.body || {};
    if (req.files) {
        data.imgPD = [];
        if (req.files.imgPd1 && req.files.imgPd1.length) {
            data.imgPD.push(req.files.imgPd1[0].path);
        }
        if (req.files.imgPd2 && req.files.imgPd2.length) {
            data.imgPD.push(req.files.imgPd2[0].path);
        }
        if (req.files.imgPd3 && req.files.imgPd3.length) {
            data.imgPD.push(req.files.imgPd3[0].path);
        }
        if (req.files.imgPd4 && req.files.imgPd4.length) {
            data.imgPD.push(req.files.imgPd4[0].path);
        }
        if (req.files.imgPd5 && req.files.imgPd5.length) {
            data.imgPD.push(req.files.imgPd5[0].path);
        }

    }
    const produitService = new ProduitService(data);
    produitService.save((error, doc) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json(doc);
        }
    })
};
// Update produitService
exports.update_produitService = (req, res, next) => {
    let data = req.body || {};
    if (req.files.imgCb && req.files.imgCb.length) {
        data.refCodeBarre = req.files.imgCb[0].path;
    }
    if (req.files.imgQr && req.files.imgQr.length) {
        data.refQR = req.files.imgQr[0].path;
    }

    ProduitService.findByIdAndUpdate(req.params.id, { $set: data }, { new: true })
        .populate('tarifSaisonnier')
        .exec((error, doc) => {
            if (error) {
                console.log(error);
            } else {
                res.status(200).json(doc);
            }
        })
};

// Delete produitService
exports.delete_produitService = (req, res, next) => {
    ProduitService.findByIdAndDelete(req.params.id, (error, doc) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json(doc);
        }
    })
};

// Delete All produitServices
exports.deleteAll_produitServices = (req, res, next) => {
    ProduitService.deleteMany({}, (error, doc) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json(doc);
        }
    })
};
// Get produitService by id
exports.get_produitService_by_id = (req, res, next) => {
    ProduitService.findById(req.params.id)
        .populate('tarifSaisonnier')
        .exec((error, doc) => {
            if (error) {
                console.log(doc);
            } else {
                res.status(200).json(doc);
            }
        })
};

// Add tarifSaisonnier to product tarif saisonniers list
exports.add_tarifSaisonnier_to_list = (req, res, next) => {
    ProduitService.findById(req.params.id, (error, doc) => {
        if (error) {
            console.log(error);
        } else {
            if (!doc.tarifSaisonnier.includes(req.body.tsId)) {
                doc.updateOne({ $push: { tarifSaisonnier: req.body.tsId } }, (error, doc) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.status(200).json(doc);
                    }
                })
            }else{
                console.log("Tarif Saisonnier exist in the list");
            }
        }
    })
}

// Delete tarifSaisonnier from product tarif saisonniers list
exports.delete_tarifSaisonnier_from_list = (req, res, next) => {
    ProduitService.findById(req.params.id, (error, doc) => {
        if (error) {
            console.log(error);
        } else {
            if (doc.tarifSaisonnier.includes(req.body.tsId)) {
                doc.updateOne({ $pull: { tarifSaisonnier: req.body.tsId } }, (error, doc) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.status(200).json(doc);
                    }
                })
            } else {
                console.log("Tarif Saisonnier doesn't exist in the list");
            }

        }
    })
}
