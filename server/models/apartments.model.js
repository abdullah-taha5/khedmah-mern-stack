const mongoose = require('mongoose');

const Apartments = mongoose.Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    imgUrl: {type: String},
    price: {type: Number, required: true},
    location: {type: String, required: true},
    phone: {type: Number, required: true},
    showData: {type: Boolean, required: true},
    createdAt: {type: Date, default: new Date()},
    createdBy: {type: String, required: true},
    user_id: {type: String, required: true},
    status: {type: Boolean, required: true, default: false},

})

const model = mongoose.model("Apartments", Apartments);
module.exports = model;