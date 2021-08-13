const mongoose = require('mongoose');
const indicationFraisAddSchema = mongoose.Schema({
    refFrais:String,
    fraisAddCond:Boolean,
    natureCoutAdd:String,
    valeurCoutAdd:Number,
    promoNouv: Boolean,
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


module.exports = mongoose.model('IndicationFraisAdd', indicationFraisAddSchema);