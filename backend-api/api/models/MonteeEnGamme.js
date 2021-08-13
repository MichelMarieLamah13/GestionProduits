const mongoose = require('mongoose');
const monteeEnGammeSchema = mongoose.Schema({
    typeMonteeEnGamme: String,
    description: String,
    iconeSymbol: String,
    produitService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('MonteeEnGamme', monteeEnGammeSchema);