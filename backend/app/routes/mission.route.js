const missons = require("../controllers/mission.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(missons.create)
    .get(missons.findAll)

router.route('/:id')
    // .get(missons.find)
    .delete(missons.delete)
    // .put(missons.update)

module.exports = router;