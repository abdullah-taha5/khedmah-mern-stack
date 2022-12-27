const mongoose = require('mongoose');

const Fav = mongoose.Schema({
    user_id: {type: String, required: true},
    imageUrl: {type: String, required: true},
    productUrl: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: String, required: true},
});

const model = mongoose.model("Fav", Fav);
module.exports = model;