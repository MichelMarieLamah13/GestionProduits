const mongoose = require('mongoose');
const marqueSchema = mongoose.Schema({
    refMarque: String,
    marque: String,
    model: String,
    sModel: String,
    sSModel: String,
    millissime: Number,
    produitService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('Marque', marqueSchema);