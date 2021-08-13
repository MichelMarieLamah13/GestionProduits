const TarifSaisonnier = require('../models/TarifSaisonnier');

// Get all tarif saisonniers
exports.get_all_tarifSaisonniers = (req, res, next) => {
    TarifSaisonnier.find({})
        .populate('produitService')
        .exec((error, doc) => {
            if (error) {
                console.log(error);
            } else {
                res.status(200).json(doc);
            }
        })
};

// Add tarifSaisonnier
exports.add_tarifSaisonnier = (req, res, next) => {
    let data = req.body;
    const tarifSaisonnier = new TarifSaisonnier(data);
    tarifSaisonnier.save((error, doc) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json(doc);
        }
    });
};
// Update tarifSaisonnier
exports.update_tarifSaisonnier = (req, res, next) => {
    TarifSaisonnier.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (error, doc) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json(doc);
        }
    })
};


// Delete tarifSaisonnier
exports.delete_tarifSaisonnier = (req, res, next) => {
    TarifSaisonnier.findByIdAndDelete(req.params.id, (error, doc) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).json(doc);
        }
    })
};
// Get tarifSaisonnier by id
exports.get_tarifSaisonnier_by_id = (req, res, next) => {
    TarifSaisonnier.findById(req.params.id, (error, doc) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json(doc);
        }
    })
};

// Delete All tarifSaisonniers
exports.deleteAll_tarifSaisonniers = (req, res, next) => {
    TarifSaisonnier.deleteMany({}, (error, doc) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json(doc);
        }
    })
};