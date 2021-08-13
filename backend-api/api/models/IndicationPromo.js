const mongoose = require('mongoose');
const indicationPromoSchema = mongoose.Schema({
    refOffre:String,
    prodDirectConcer:Boolean,
    promoNouv: Boolean,
    natureRed: String,
    valeurReduction: Number,
    interessement: Boolean,
    valeurInteressement: Number,
    avantage: Boolean,
    valeurAvantage: Number,
    commentaireAssoc: String,
    perioDebut: Date,
    periodFin: Date,
    etatOffre: String,
    appToAllDistrs: Boolean,
    concernDistrs: {
        type: [String],
        default: []
    },
    noConcernDistrs: {
        type: [String],
        default: []
    },
    appToAllZones: {
        type: Boolean,
        default: false
    },
    concernZones: {
        type: [String],
        default: []
    },
    noConcernZones: {
        type: [String],
        default: []
    },
    description:String,
    commentaire:String,
    insCaractVar: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InsCaractVar'
        }],
        default: []
    },
    produitService:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('IndicationPromo', indicationPromoSchema);