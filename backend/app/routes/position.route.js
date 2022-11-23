const positions = require("../controllers/position.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(positions.create)
    .get(positions.findAll)

router.route('/:id')
    .get(positions.find)
    .delete(positions.delete)
    .put(positions.update)

module.exports = router;