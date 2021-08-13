const mongoose = require('mongoose');
const instCommentaireInterneSchema = mongoose.Schema({
    date: Date,
    auteur: String,
    commentaire: String,
    produitService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('InstCommentaireInterne', instCommentaireInterneSchema);