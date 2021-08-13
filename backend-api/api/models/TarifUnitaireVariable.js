const mongoose = require('mongoose');
const TarifUVSchema = mongoose.Schema({
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
    produitService:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('TarifUV', TarifUVSchema);