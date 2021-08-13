const mongoose = require('mongoose');
const insCaractVarSchema = mongoose.Schema({
    refInstCaractVar:String,
    affUniqPriv:Boolean,
    groupe:String,
    label:String,
    valeur:String,
    unite:String,
    ordre:Number,
    typeCoutAdd:Number,
    valeurCoutAdd:Number,
    prix:Number,
    produitService:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProduitService'
        }],
        default: []
    },
    indPromo:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IndicationPromo'
        }],
        default: []
    },
    indFraisAdd:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IndicationFraisAdd'
        }],
        default: []
    },
    indStock:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IndicationStock'
        }],
        default: []
    },
    expedition:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expedition'
        }],
        default: []
    },
}, {timestamps:true});


module.exports = mongoose.model('InsCaractVar',insCaractVarSchema);