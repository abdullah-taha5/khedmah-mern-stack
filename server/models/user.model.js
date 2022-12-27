const mongoose = require('mongoose');

const User = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
    adminRole: {type: Boolean, required: true},
}) 

const model = mongoose.model("User", User);
module.exports = model;