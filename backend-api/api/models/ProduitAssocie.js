const mongoose = require('mongoose');
const produitAssocieSchema = mongoose.Schema({
    typeAssociation: String,
    produitService1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    },
    produitService2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('ProduitAssocie', produitAssocieSchema);