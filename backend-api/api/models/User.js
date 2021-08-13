const mongoose = require('mongoose');
require('mongoose-type-email');
const userSchema = mongoose.Schema({
    email:{
        type: mongoose.SchemaTypes.Email,
        unique: true,
        required:true,
        correctTld: true
    },
    password:{
        type: String,
        min:6,
        required:true
    },
    img:{
        type: String,
        default:''
    },
    role:{
        type: Number,
        enum: [1, 2, 3], // 1: Admin, 2: Distributeur, 3: Client
        default: 2
    }
}, {timestamps:true});


module.exports = mongoose.model('User',userSchema);