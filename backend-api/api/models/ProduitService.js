const mongoose = require('mongoose');
const productServiceSchema = mongoose.Schema({
    refProduit: String,
    refCB: String,
    refQR: String,
    typePS: String,
    nouveau: Boolean,
    designation: String,
    slogan: String,
    madeIn: String,
    descriptif: String,
    resumeDescriptif: String,
    imgPD:[String],
    tag: String,
    virtuel: Boolean,
    telechargeable: Boolean,
    urlExterne: String,
    msgBtnComExterne: String,
    affPublique: Boolean,
    affTarif: Number,
    venteSeule: Boolean,
    typeVente: String,
    uniteProduit: String,
    minCommande: Number,
    maxCommande: Number,
    typeTarif: Number,
    tarifUHT: Number,
    tVA: Number,
    pays: String,
    tarVarParSaison: Boolean,
    tarVarParZoneGeo: Boolean,
    tarVarParDsbtr: Boolean,
    tarVarParVrte: Boolean,
    tarVarParQte: Boolean,
    notation: Number,
    affAvis: Boolean,
    etatPub: String,
    msgAchat: String,
    ordreAff: Number,
    gestStock: Boolean,
    indEtatStock: Boolean,
    expedition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expedition'
    },
    indicationStock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IndicationStock'
    },
    indicationFraisAdd: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IndicationFraisAdd',
        }],
        default: []
    },
    indicationPromo: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IndicationPromo',
        }],
        default: []
    },
    insCaractVar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InsCaractVar'
    },
    tarifUV: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TarifUV'
    },
    grilleTarifaire: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GrilleTarifaire',
        }],
        default: []
    },
    tarifSaisonnier: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TarifSaisonnier',
        }],
        default: []
    },
    distinction: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Distinction',
        }],
        default: []
    },
    monteeEnGamme: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MonteeEnGamme',
        }],
        default: []
    },
    criteresCalculables: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CritereCalculable',
        }],
        default: []
    },
    variantesHorizs: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductService',
        }],
        default: []
    },
    marque: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marque'
    },
    instClassifs: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InstClassif',
        }],
        default: []
    },
    instCaracterists: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InstCaracterist',
        }],
        default: []
    },
    annotations: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Annotation',
        }],
        default: []
    },
    contenuMmedia: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ContenuMmedia',
        }],
        default: []
    },
    instCommentaireInterne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InstCommentaireInterne'
    },
    garAssur: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GarAssur',
        }],
        default: []
    }
}, { timestamps: true });


module.exports = mongoose.model('ProductService', productServiceSchema);