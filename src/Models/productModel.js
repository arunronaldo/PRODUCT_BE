const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        unique: true,
    },
    productSku: {
        type: String,
        unique: true,
    },
    productReview: String,
    productRating: Number,
    productPrice: Number,
    productType: String,
    productImage: String,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
}, { versionKey: false })

module.exports = mongoose.model("Product", productSchema)