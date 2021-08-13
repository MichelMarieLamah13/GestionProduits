const mongoose = require('mongoose');
const annotationSchema = mongoose.Schema({
    date: Date,
    email: String,
    commentaire: String,
    note: Number,
    produitService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('Annotation', annotationSchema);