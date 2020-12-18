const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true,
    },
    fullname:{
        type:String,
        required:true,
    },
    feedback: {
        type:String,
        required:true,
    }

});

module.exports = new mongoose.model('User',UserSchema);