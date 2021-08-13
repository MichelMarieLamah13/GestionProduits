const mongoose = require('mongoose');
const garAssurSchema = mongoose.Schema({
    typeGarAssur: {
        type: Number,
        enum: [1, 2, 3], //1?
        default: 1
    },
    valid_de: {
        type: Date,
        min: Date.now,
        default: Date.now
    },
    duree: {
        type: Number,
        default: 1
    },
    uniteDureeGar: {
        type: Number,
        enum: [1, 2, 3], //1?
        default: 1
    },
    valeurGar: {
        type: Number,
        default: 1
    },
    monnaie: {
        type: Number,
        enum: [1, 2, 3], //1=MAD?
        default: 1
    },
    descriptif: {
        type: String,
        default: ''
    },
    contratModel: {
        type: String,
        default: ''
    },
    produitService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    },
    contenuMmedia: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ContenuMmedia',
        }],
        default: []
    }
}, { timestamps: true });


module.exports = mongoose.model('GarAssur', garAssurSchema);