const children = require("../controllers/children.controller");
const express = require("express");
const router = express.Router();

router.route('/')
    .post(children.create)
    .get(children.findAll)

router.route('/:id')
    .get(children.find)
    .delete(children.delete)
    .put(children.update)

module.exports = router;