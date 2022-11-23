const cdi = require("../controllers/cdi.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(cdi.create)
    .get(cdi.findAll)
    .put(cdi.update)

// router.route('/:id')
//     .get(cdi.find)
//     .put(cdi.update)
//     .delete(cdi.delete)

module.exports = router;