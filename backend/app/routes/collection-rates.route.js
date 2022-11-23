const collectionRates = require("../controllers/collection-rates.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(collectionRates.create)
    .get(collectionRates.findAll)

router.route('/:id')
    .get(collectionRates.find)
    .delete(collectionRates.delete)

module.exports = router;