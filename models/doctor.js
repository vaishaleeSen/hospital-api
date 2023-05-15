const mongoose = require('mongoose');

const docterSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Doctor = mongoose.model('Doctor',docterSchema);
module.exports = Doctor;