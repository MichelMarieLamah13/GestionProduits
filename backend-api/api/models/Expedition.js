const mongoose = require('mongoose');
const expeditionSchema = mongoose.Schema({
    poids:Number,
    codeUnitePoids:String,
    largeur:Number,
    hauteur:Number,
    profondeur:Number,
    refQRStock:String,
    refCodeBarreStock:String,
    etatStock: String,
    indQteDispo: Boolean,
    uniteDimension: String,
    classeLivraison: String,
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


module.exports = mongoose.model('Expedition', expeditionSchema);