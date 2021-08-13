const mongoose = require('mongoose');
const instClassifSchema = mongoose.Schema({
    refInstClassif:String,
    valTexte:String,
    attribut3:String,
    iconeSymbClassif:String,
    produitService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('InstClassif', instClassifSchema);