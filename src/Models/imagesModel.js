const mongoose = require('mongoose')

const imagesSchema = new mongoose.Schema({
    imageType: {
        type: String,
        require: true,
        enum: ['Product']
    },
    refId: {
        type: String,
        reuire: true
    },
    imageURL: {
        type: String
    }
})


module.exports = mongoose.model('Images', imagesSchema)