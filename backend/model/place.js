const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const newPlace = new Schema({
    placeName:{
        type: String,
        required: true
    },
    placeDescription:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String
    }
})

const place = mongoose.model("Place", newPlace);

module.exports = place;
