const receipts = require("../controllers/receipt.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(receipts.create)
    .get(receipts.findAll)

router.route('/:id')
    // .get(receipts.find)
    .delete(receipts.delete)
    // .put(receipts.update)

module.exports = router;