const mongoose = require('mongoose');
const instCaracteristSchema = mongoose.Schema({
    refInstCaracterist:String,
    affichagePrive:Boolean,
    groupeCaracterist:String,
    labelCaracterist:String,
    valeurCaracterist:String,
    uniteCaracterist:String,
    ordreCaracterist:Number,
    coutAdditionnel:Boolean,
    typeCoutAdditionnel:String,
    valeurCoutAdditionnel:Number,
    produitService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('InstCaracterist', instCaracteristSchema);