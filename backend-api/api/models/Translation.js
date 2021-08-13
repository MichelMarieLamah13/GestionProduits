const mongoose = require('mongoose');
const translationSchema = new mongoose.Schema({
    lang:String,
    valeur: String,
    menu: mongoose.Schema.Types.ObjectId
});
module.exports = mongoose.model('Translation', translationSchema);