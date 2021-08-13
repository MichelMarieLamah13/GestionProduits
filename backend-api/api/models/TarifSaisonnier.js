const mongoose = require('mongoose');
const tarifSaisonnierSchema = mongoose.Schema({
    couleurSaison: String,
    saison: String,
    dateDebut: Date,
    dateFin: Date,
    labelTarif: String,
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
    produitService:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductService'
    }
}, { timestamps: true });


module.exports = mongoose.model('TarifSaisonnier', tarifSaisonnierSchema);