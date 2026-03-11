const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    bio : String,
    age : String,
    gender : String,
    },
    {timestamps : true}
);

module.exports = mongoose.model('Profile', profileSchema);
    