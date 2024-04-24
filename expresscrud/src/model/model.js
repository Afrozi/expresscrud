const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let mongoosenew = mongoose.Schema({
    name :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
});

mongoosenew.pre('save',async function(next) {
    console.log(this.password);
    this.password = await bcrypt.hash(this.password,10);
    next();
    this.cpassword = undefined;
})

let newmodel = mongoose.model("afroz",mongoosenew);
module.exports = newmodel;