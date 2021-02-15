const { Double, Int32 } = require('bson');
const { mongoose } = require('./../mongoose');

const ProductSchema = new mongoose.Schema({
    "id": String,
    "img_url": String,
    "name": String,
    "brand": String,
    "description": String,
    "type": String,
    "price": Number,
    "stock": Number
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;