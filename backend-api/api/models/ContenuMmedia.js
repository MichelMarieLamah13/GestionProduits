const mongoose = require('mongoose');
const contenuMmediaSchema = mongoose.Schema({
    refContenu: {
        type: String,
        default: ''
    },
    typeContenu: {
        type: String,
        default: ''
    },
    titreDoc: {
        type: String,
        default: ''
    },
    formatDoc: {
        type: Number,
        enum: [1, 2, 3], //1:IMAGE, 2:VIDEO, ...
        default: 1
    },
    tailleDoc: {
        type: Number,
        default: 1
    },
    uniteTaille: {
        type: Number,
        enum: [1, 2, 3], //1:?
        default: 1
    },
    urlDoc: {
        type: String,
        default: ''
    },
    provenanceInterne: {
        type: Boolean,
        default: false
    },
    produitService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    },
    garAssur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GarAssur'
    }
}, { timestamps: true });


module.exports = mongoose.model('ContenuMmedia', contenuMmediaSchema);