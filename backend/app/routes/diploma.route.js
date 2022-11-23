const diplomas = require("../controllers/diploma.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(diplomas.create)
    .get(diplomas.findAll)

router.route('/:id')
    .get(diplomas.find)
    .put(diplomas.update)
    .delete(diplomas.delete)

module.exports = router;