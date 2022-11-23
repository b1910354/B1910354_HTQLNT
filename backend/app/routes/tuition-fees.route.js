const tuitionFees = require("../controllers/tuition-fees.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(tuitionFees.create)
    .get(tuitionFees.findAll)

router.route('/:id')
    .get(tuitionFees.find)
    .delete(tuitionFees.delete)
    .put(tuitionFees.update)

module.exports = router;