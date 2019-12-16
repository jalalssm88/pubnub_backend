const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    full_name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});

module.exports = mongoose.model("User", UserSchema);

