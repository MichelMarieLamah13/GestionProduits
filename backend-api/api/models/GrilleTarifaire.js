const mongoose = require('mongoose');
const grilleTarifaireSchema = mongoose.Schema({
    qteInf: Number,
    qteSup: Number,
    gainPU: Number,
    commentaire: String,
    tarifUHT: Number,
    monnaie: String,
    appToAllDistrs: Boolean,
    concernDistrs: {
        type: [String],
        default: []
    },
    noConcernDistrs: {
        type: [String],
        default: []
    },
    appToAllZones: Boolean,
    concernZones: {
        type: [String],
        default: []
    },
    noConcernZones: {
        type: [String],
        default: []
    },
    produit:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('GrilleTarifaire', grilleTarifaireSchema);