const parents = require("../controllers/parents.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(parents.create)
    .get(parents.findAll)

// router.route('/:id')
//     .get(parents.find)
//     .delete(parents.delete)
//     .put(parents.update)

module.exports = router;