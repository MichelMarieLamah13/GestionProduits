const mongoose = require('mongoose');
const produitComposantSchema = mongoose.Schema({
    typeProduit: String,
    qteProduit:Number,
    uniteQte:Number,
    refProdComposant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    },
    refProduitComposeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('ProduitComposant', produitComposantSchema);