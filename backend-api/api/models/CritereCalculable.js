const mongoose = require('mongoose');
const critereCalculableSchema = mongoose.Schema({
    groupeCritere: Number,
    refCritere: String,
    label: String,
    valeur: String,
    uniteValeur: String,
    produitService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('CritereCalculable', critereCalculableSchema);