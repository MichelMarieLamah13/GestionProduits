const mongoose = require('mongoose');
const indicationStockSchema = mongoose.Schema({
    refPartenaire:String,
    refStock:String,
    refRFIDStock:String,
    refQRStock:String,
    refCodeBarreStock:String,
    etatStock: String,
    indQteDispo: Boolean,
    qteDisponible: Number,
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


module.exports = mongoose.model('IndicationStock', indicationStockSchema);