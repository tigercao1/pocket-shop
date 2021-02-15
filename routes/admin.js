const express = require('express');
const router = express.Router();

const shopData = require('./../data.json');
const Product = require('./../db/models/Product');

router.post('/reset', (req, res) => {
    console.info("Repopulating database");
    Product.find().remove();
    for (let i = 0; i < shopData.length; i++) {
        console.info("Adding product:", shopData[i].name);
        new Product(shopData[i]).save();
    }

    res.status(200).json(shopData);
})

module.exports = router;