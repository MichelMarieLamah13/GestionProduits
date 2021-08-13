const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    translations:[mongoose.Schema.Types.ObjectId],
    path:String,
    icon: String,
    type: String,
    badgeType: String,
    badgeValue: String,
    active: Boolean,
    bookmark: Boolean,
    priority: Number,
    order: Number,
    children: [mongoose.Schema.Types.ObjectId]
},{ timestamps: true });
module.exports = mongoose.model('Menu', menuSchema);