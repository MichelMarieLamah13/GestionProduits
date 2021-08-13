const mongoose = require('mongoose');
const distinctionSchema = mongoose.Schema({
    typeDistinction:String,
    designation:String,
    logo:String,
    dateObtention:Date,
    duree:Number,
    uniteDuree:String,
    produitService:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProduitService'
    }
}, { timestamps: true });


module.exports = mongoose.model('Distinction', distinctionSchema);